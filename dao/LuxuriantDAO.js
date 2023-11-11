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
    order_cost
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
              },
            },
            { returnOriginal: false }
          );
      }
    } else {
      // If the customer does not exist, add them to the database
      const result = await cluster0
        .collection("customers")
        .insertOne({
          customer_name,
          customer_address,
          customer_email,
          customer_phone,
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
      payment_status: "pending",
      customer_id: customer._id,
      order_details: customer_order.map((product) => ({
        product_id: new ObjectId(product.product_id),
        quantity: product.quantity,
        price: product.cost,
      })),
    };

    // Add the order to the database
    const orderResult = await cluster0.collection("orders").insertOne(order);
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
    const result = await cluster0.collection("customers").find({}).toArray();
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

  // Method to add products
  async addProduct() {
    // Define the products to be added
    const products = [
      { product_name: "Product 1", product_cost: 100 },
      { product_name: "Product 2", product_cost: 200 },
      { product_name: "Product 3", product_cost: 300 },
      // Add more products as needed
    ];

    // Add the products to the database
    if (await cluster0.collection("products").insertMany(products)) {
      console.log("Products added successfully");
      return products;
    } else {
      console.log("Failure in adding products");
    }
  }
}
