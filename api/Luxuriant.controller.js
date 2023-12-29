// Import necessary modules and initialize DAO
import { sendMail, sendSubscriptionMail } from "../send_mail.js";
import LuxuriantDAO from "../dao/LuxuriantDAO.js";
import dotenv from "dotenv";
dotenv.config();
const dao = new LuxuriantDAO(); // Create a new instance of the LuxuriantDAO class
const master_password = process.env.Master_Password; // Get master password from environment variables

// Define LuxuriantController class
export default class LuxuriantController {
	// Method to get Luxuriant data
	static async apiGetLuxuriant(req, res, next) {
		try {
			// Send a JSON response with a message
			res.json({ message: "Hello World!" });
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to add orders
	static async apiAddOrdersLuxuriant(req, res, next) {
		try {
			// Extract order details from the request query
			const customer_email = req.query.customer_email;
			const customer_phone = req.query.customer_phone;
			const customer_address = req.query.customer_address;
			const customer_name = req.query.customer_name;
			const customer_order = req.query.customer_order;
			const order_cost = req.query.order_cost;

			// Add the order using the DAO
			const order = await dao.addOrder(
				customer_email,
				customer_phone,
				customer_address,
				customer_name,
				customer_order,
				order_cost
			);

			// Send a JSON response with the order details if the order was added successfully
			if (order.message === "Success") {
				res.json({
					order_id: order.order_id,
					order_cost: order.order_cost,
					payment_status: order.payment_status,
					message: order.message,
				});
			} else {
				// Send a JSON response with the error message if the order was not added successfully
				res.json({ message: order.message });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to get customers
	static async apiGetCustomers(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Get the customers using the DAO
				const customers = await dao.getCustomers();

				// Send a JSON response with the customers if they were found
				if (customers) {
					res.json({ customers: customers, message: "Success" });
				} else {
					// Send a JSON response with an error message if no customers were found
					res.json({ message: "No customers found" });
				}
			} else {
				// Send a JSON response with an error message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to get products
	static async apiGetProducts(req, res, next) {
		try {
			// Check if the provided password matches the master password
			// const pass = req.body.password;
			// if (pass === master_password) {
			// Get the products using the DAO
			const products = await dao.getProducts();

			// Send a JSON response with the products if they were found
			if (products) {
				res.json({ products: products, message: "Success" });
			} else {
				// Send a JSON response with an error message if no products were found
				res.json({ message: "No products found" });
			}
			// } else {
			//   // Send a JSON response with an error message if the password is incorrect
			//   res.json({ message: "Incorrect password" });
			// }
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to get orders
	static async apiGetOrders(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Get the orders using the DAO
				const orders = await dao.getOrders();

				// Send a JSON response with the orders if they were found
				if (orders) {
					res.json({ orders: orders, message: "Success" });
				} else {
					// Send a JSON response with an error message if no orders were found
					res.json({ message: "No orders found" });
				}
			} else {
				// Send a JSON response with an error message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to change payment status
	static async apiChangePaymentStatus(req, res, next) {
		try {
			const pass = req.body.password;
			const order_id = req.body.order_id;
			const payment_status = req.body.payment_status;
			const order = await dao.getOrder(order_id);
			if (pass === master_password) {
				const customer = await dao.getCustomerEmail(order.customer_id);
				const product = await dao.getProducts();

				if (order) {
					const mail = await sendMail(customer, order, product);
					if (mail) {
						await dao.changePaymentStatus(order_id, payment_status);
						res.json({ order: order, message: "Success" });
					} else {
						res.json({ message: "Failure" });
					}
				} else {
					res.json({ message: "No orders found" });
				}
			} else {
				res.status(401).json({ message: "Unauthorized" });
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: "An error occurred" });
		}
	}

	static async apiSendSubscriptionEmails(req, res, next) {
		try {
			const pass = req.body.password;
			const customer_details = req.body.customers;
			const subject = req.body.subject;
			const content = req.body.content;

			if (pass === master_password) {
				const mail = await sendSubscriptionMail(
					customer_details,
					subject,
					content
				);
				if (mail) {
					res.json({ message: "Success" });
				} else {
					res.json({ message: "Failure" });
				}
			} else {
				res.status(401).json({ message: "Unauthorized" });
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({ message: "An error occurred" });
		}
	}
	// Method to check password
	static async apiCheckPassword(req, res) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Send a JSON response with a success message if the password is correct
				res.json({ message: "Success" });
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Failure" });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to delete product
	static async apiDeleteProduct(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Delete the product using the DAO
				const product = await dao.deleteProduct(req.body.product_id);

				// Send a JSON response with the product details if the product was deleted successfully
				if (product) {
					res.json({
						product_details: product,
						message: "Product deleted successfully",
					});
				} else {
					// Send a JSON response with an error message if the product was not deleted successfully
					res.json({ message: "Failure in deleting product" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to add products
	static async apiAddProductsLuxuriant(req, res, next) {
		// console.log(req.body)
		// get password from body
		const pass = req.body.password;
		// get product details from body
		const new_product_details = req.body.product_details;

		// Check if the provided password matches the master password
		if (pass === master_password) {
			// Add a product using the DAO
			dao.addProduct(new_product_details)
				.then((product) => {
					// Send a JSON response with the product details if the product was added successfully
					if (product) {
						res.json({
							product_details: product,
							message: "success",
						});
					} else {
						// Send a JSON response with an error message if the product was not added successfully
						res.json({ message: "failure" });
					}
				})
				.catch((e) => {
					// Send a 500 status code and the error message if an error occurs
					res.status(500).json({ error: e.message });
				});
		} else {
			// Send a JSON response with a failure message if the password is incorrect
			res.json({ message: "Incorrect password" });
		}
	}

	// Method to update product
	static async apiUpdateProduct(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Update the product using the DAO
				dao.updateProduct(req.body.product_id, req.body.product_details)
					.then((product) => {
						// Send a JSON response with the product details if the product was updated successfully
						console.log(product);
						if (product) {
							res.json({
								product_details: product,
								message: "Product updated successfully",
							});
						} else {
							// Send a JSON response with an error message if the product was not updated successfully
							res.json({
								message: "Failure in updating product",
							});
						}
					})
					.catch((e) => {
						// Send a 500 status code and the error message if an error occurs
						res.status(500).json({ error: e.message });
					});
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to update multiple products
	static async apiUpdateMultipleProducts(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// console.log(req.body.product_details);
				// Update the product using the DAO
				dao.updateMultipleProducts(req.body.product_details)
					.then((result) => {
						console.log(result)
						// Send a JSON response with the product details if the product was updated successfully
						if (result) {
							res.json({
								message: "success",
							});
						} else {
							// Send a JSON response with an error message if the product was not updated successfully
							res.json({
								message: "failure",
							});
						}
					})
					.catch((e) => {
						// Send a 500 status code and the error message if an error occurs
						res.status(500).json({ error: e.message });
					});
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}
}
