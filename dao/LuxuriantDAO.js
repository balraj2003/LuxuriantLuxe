// Import necessary modules
import { ObjectId } from "mongodb";
import moment from "moment-timezone";

// Declare a variable to hold the database connection
let cluster0;

// Define LuxuriantDAO class
export default class LuxuriantDAO {
	// Method to inject the database connection
	static async InjectDB(conn) {
		// If the connection is already established, return
		if (cluster0) {
			return;
		}
		try {
			// Establish a connection to the database
			cluster0 = await conn.db("cluster0");
		} catch (e) {
			// Log any errors that occur during connection
			console.error(
				`Unable to establish a collection handle in LuxuriantDAO: ${e}`
			);
		}
	}

	// Method to add an order
	async addOrder(
		customer_email,
		customer_phone,
		customer_address,
		customer_name,
		customer_order,
		updated_customer_points,
		order_cost,
		points_used
	) {
		// Check if the customer already exists
		let customer = await cluster0
			.collection("customers")
			.findOne({ customer_email });
		//also check if the customer exists and has the same information if not then update the customer information
		if (customer) {
			if (
				customer.customer_phone !== customer_phone ||
				customer.customer_address !== customer_address ||
				customer.customer_name !== customer_name
			) {
				const result = await cluster0
					.collection("customers")
					.findOneAndUpdate(
						{ customer_email },
						{
							$set: {
								customer_phone: customer_phone,
								customer_address: customer_address,
								customer_name: customer_name,
								customer_points: updated_customer_points,
							},
						},
						{ returnOriginal: false }
					);
			}
		} else {
			// If the customer does not exist, add them to the database
			const result = await cluster0.collection("customers").insertOne({
				customer_name,
				customer_address,
				customer_email,
				customer_phone,
				customer_points: updated_customer_points,
			});
			customer = { _id: result.insertedId };
		}
		// Parse the order
		customer_order = JSON.parse(customer_order);

		console.log("customerId: " + customer._id);
		// Create the order object
		const order = {
			order_date: moment().tz("Asia/Kolkata").format("DD/MM/YY"),
			order_time: moment().tz("Asia/Kolkata").format("HH:mm:ss"),
			order_cost,
			points_used,
			payment_status: "pending",
			customer_id: customer._id,
			order_details: customer_order.map((product) => ({
				product_id: new ObjectId(product.product_id),
				quantity: product.quantity,
				price: product.cost,
			})),
		};

		// Add the order to the database
		const orderResult = await cluster0
			.collection("orders")
			.insertOne(order);
		// Check if the order was inserted successfully
		if (orderResult) {
			// If the order was inserted successfully, return the order details
			return {
				order_id: orderResult.insertedId,
				order_cost: order_cost,
				payment_status: "pending",
				message: "Success",
			};
		} else {
			// If the order was not inserted successfully, return a failure message
			return {
				message: "Failure",
			};
		}
	}

	// Method to get all customers
	async getCustomers() {
		const result = await cluster0
			.collection("customers")
			.find({})
			.toArray();
		return result;
	}

	// Method to get all products
	async getProducts() {
		const result = await cluster0.collection("products").find({}).toArray();
		return result;
	}

	// Method to get all orders
	async getOrders() {
		const result = await cluster0.collection("orders").find({}).toArray();
		return result;
	}

	// Method to get order from id
	async getOrder(order_id) {
		const result = await cluster0
			.collection("orders")
			.findOne({ _id: new ObjectId(order_id) });
		return result;
	}

	// Method to change the payment status of an order
	async changePaymentStatus(order_id, payment_status) {
		const result = await cluster0
			.collection("orders")
			.findOneAndUpdate(
				{ _id: new ObjectId(order_id) },
				{ $set: { payment_status: payment_status } },
				{ returnOriginal: false }
			);

		if (result) {
			return {
				order_details: result.order_details,
				customer_id: result.customer_id,
				message: "Success",
			};
		} else {
			return {
				message: "Failure",
			};
		}
	}

	// Method to get a customer's email
	async getCustomerEmail(customer_id) {
		const result = await cluster0
			.collection("customers")
			.findOne({ _id: new ObjectId(customer_id) });
		return result;
	}

	// Method to add a single product
	async addProduct(product_details) {
		// product details looks like this:
		// {
		// 	product_name: "Product Name",
		// 	product_description: "Product Description",
		// 	product_cost: 100,
		// 	product_image_links: ["image1", "image2"],
		// 	product_category: ["Product Category", "Product Category 2"]
		//  product_quantity: 100
		// }
		const result = await cluster0
			.collection("products")
			.insertOne(product_details);
		return result;
	}

	// Method to delete a single product
	async deleteProduct(product_id) {
		const result = await cluster0
			.collection("products")
			.deleteOne({ _id: new ObjectId(product_id) });
		return result;
	}

	// Method to update a single product
	async updateProduct(product_id, product_details) {
		const result = await cluster0
			.collection("products")
			.findOneAndUpdate(
				{ _id: new ObjectId(product_id) },
				{ $set: product_details },
				{ returnOriginal: false }
			);
		return result;
	}

	// Method to update mulitple products
	async updateMultipleProducts(product_details) {
		// product_details is a list of these objects:
		// {
		//   "_id": "654cd992ae6a271afeed6b4c",
		//   "product_name": "Product Name 3",
		//   "product_cost": 100,
		//   "product_image_links": [
		//       "image1",
		//       "image2"
		//   ],
		//   "product_category": [
		//       "Product Category",
		//       "Product Category 2"
		//   ],
		//   "product_quantity": 100,
		//   "product_description": "Product Description"
		// }
		// Iterate through the list of product details, and update all of them

		let error_occured = false;
		// console.log(product_details);
		for (let i = 0; i < product_details.length; i++) {
			// exclude id from product_details[i]
			const { _id, ...rest } = product_details[i];
			await cluster0
				.collection("products")
				.findOneAndUpdate(
					{ _id: new ObjectId(product_details[i]._id) },
					{ $set: rest },
					{ returnOriginal: false }
				)
				.then((result) => {
					// Handle success
					console.log("updated product: " + result._id);
				})
				.catch((error) => {
					error_occured = true;
					// Handle error
					console.log(error);
				});
		}

		if (error_occured) {
			return false;
		} else {
			return true;
		}
	}

	// Method to delete an order
	async deleteOrder(order_id) {
		const result = await cluster0
			.collection("orders")
			.deleteOne({ _id: new ObjectId(order_id) });
		return result;
	}

	// Method to delete a customer
	async deleteCustomer(customer_id) {
		const result = await cluster0
			.collection("customers")
			.deleteOne({ _id: new ObjectId(customer_id) });
		return result;
	}

	// Method to get customer points
	async getCustomerPoints(customer_id) {
		const result = await cluster0
			.collection("customers")
			.findOne({ _id: new ObjectId(customer_id) });
		// if no customer points found, set them to 0, and return 0
		if (!result) {
			await cluster0
				.collection("customers")
				.insertOne({ customer_points: 0 });
			return 0;
		}
		return result;
	}
}
