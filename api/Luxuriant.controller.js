// Import necessary modules and initialize DAO
import { sendMail } from "../send_mail.js";
import LuxuriantDAO from "../dao/LuxuriantDAO.js";
const dao = new LuxuriantDAO(); // Create a new instance of the LuxuriantDAO class
const master_password = process.env.master_password; // Get master password from environment variables
// const master_password = "119d22515f91b4be"; // Get master password from environment variables
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
          res.json({customers: customers, message: "Success"});
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
      const pass = req.body.password;
      if (pass === master_password) {
        // Get the products using the DAO
        const products = await dao.getProducts();

        // Send a JSON response with the products if they were found
        if (products) {
          res.json({ products: products, message: "Success"});
        } else {
          // Send a JSON response with an error message if no products were found
          res.json({ message: "No products found" });
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
      // Extract order details from the request query
      const pass = req.body.password;
      const order_id = req.query.order_id;
      const payment_status = req.query.payment_status;

      // Check if the provided password matches the master password
      if (pass === master_password) {
        // Change the payment status using the DAO
        const order = await dao.changePaymentStatus(order_id, payment_status);
        // Get the customer email using the DAO
        const customer = await dao.getCustomerEmail(order.customer_id);
        // Get the products using the DAO
        const product = await dao.getProducts();
        
        // If the order was found, send an email and a JSON response with the order details
        if (order) {
          sendMail(customer,order.order_details,product);
          res.json({order:order, message: "Success" });
        } else {
          // Send a JSON response with an error message if no orders were found
          res.json({ message: "No orders found" });
        }
      }
    } catch (e) {
      // Send a 500 status code and the error message if an error occurs
      res.status(500).json({ error: e.message });
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

  // Method to add products
  static async apiAddProductsLuxuriant(req, res, next) {
    try {
      // Add a product using the DAO
      const product = await dao.addProduct();

      // Send a JSON response with the product details if the product was added successfully
      if (product) {
        res.json({
          product_id: product.product_id,
          product_name: product.product_name,
          product_cost: product.product_cost,
          message: "Product added successfully",
        });
      } else {
        // Send a JSON response with an error message if the product was not added successfully
        res.json({ message: "Failure in adding product" });
      }
    } catch (e) {
      // Send a 500 status code and the error message if an error occurs
      res.status(500).json({ error: e.message });
    }
  }
}