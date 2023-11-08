// Import necessary modules
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { resourceUsage } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the SQLite database file
const dbPath = join(__dirname, "./Database", "luxuriant.sqlite");
console.log(dbPath);
// Define the LuxuriantDAO class
export default class LuxuriantDAO {
  constructor() {
    // Open a connection to the SQLite database
    this.db = new sqlite3.Database(dbPath);
    // Initialize the database
    this.initializeDatabase();
    console.log("Database initialized");
  }

  // Method to initialize the database
  initializeDatabase() {
    // Read the SQL query to create the tables from a file
    const createTableQuery = fs.readFileSync(
      join(__dirname, "./create_table.sql"),
      "utf8"
    );
    // Execute the SQL query
    this.db.exec(createTableQuery, (err) => {
      if (err) {
        console.log("Error in creating table");
      } else {
        console.log("Database initialized");
      }
    });
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
    const customer = await this.checkCustomer(customer_email);
    let customer_id;
  
    if (!customer) {
      // If the customer does not exist, insert them into the 'customer' table
      const query = `INSERT INTO customers (customer_name, customer_address, customer_email, customer_phone) VALUES (?, ?, ?, ?)`;
      const db = this.db; // Capture the database connection
  
      db.run(
        query,
        [customer_name, customer_address, customer_email, customer_phone],
        function (err) {
          if (err) {
            console.log("Error in adding customer", err);
            
          } else {
            console.log("Customer added");
            customer_id = this.lastID;
  
            // Continue with inserting the order
            this.insertOrderDetails(customer_id, customer_order, order_cost, db);
          }
        }
      );
    } else {
      // Customer already exists, use their customer_id
      customer_id = customer.customer_id;
  
      // Continue with inserting the order
      this.insertOrderDetails(customer_id, customer_order, order_cost, this.db);
    }
  }
  
  // Method to insert order and order details
  async insertOrderDetails(customer_id, customer_order, order_cost, db) {
    const payment_status = "pending";
    const orderQuery = `INSERT INTO orders (order_date, order_cost, payment_status, customer_id) VALUES (DATE('now'), ?, ?, ?)`;
  
    db.run(
      orderQuery,
      [order_cost, payment_status, customer_id],
      function (err) {
        if (err) {
          console.log("Error in adding order", err);
          // Handle the error, reject the promise, or take appropriate action.
        } else {
          const orderId = this.lastID;
  
          // Parse the stringified array back into a JSON array
          let customer_order_parsed;
          try {
            customer_order_parsed = JSON.parse(customer_order);
          } catch (e) {
            console.log("Error in parsing order", e);
            // Handle the error, reject the promise, or take appropriate action.
          }
  
          // For each item in the order, insert it into the 'order_details' table
          const promises = customer_order_parsed.map((product) => {
            return new Promise((resolve, reject) => {
              const query = `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
              db.run(
                query,
                [orderId, product.product_id, product.quantity, product.cost],
                function (err) {
                  if (err) {
                    console.log("Error in adding order details", err);
                    reject(err);
                  } else {
                    console.log("Order details added");
                    resolve(this.lastID);
                  }
                }
              );
            });
          });
  
          Promise.all(promises)
            .then((results) => {
              // All order details have been added
              // Resolve the main promise or take appropriate action.
            })
            .catch((err) => {
              console.log("Error in one or more order details", err);
              // Handle the error, reject the main promise, or take appropriate action.
            });
        }
      }
    );
  }
  

  // Method to check if a customer exists
  async checkCustomer(customer_email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM customers WHERE customer_email = ?`;
      this.db.get(query, [customer_email], (err, row) => {
        if (err) {
          console.log("Error in checking customer");
          reject(err);
        } else {
          if (row) {
            resolve(row);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
  async addProduct(product_name, product_cost) {
    console.log("Inside addProduct:" + product_cost);
    return new Promise((resolve, reject) => {
      const query = `Insert into products(product_name,product_cost) values (?,?)`;
      this.db.run(query, [product_name, product_cost], (err, row) => {
        if (err) {
          console.log("Error in adding product");
          reject(err);
        } else {
          console.log("Product added");
          const product = {
            product_id: this.lastID,
            product_name: product_name,
            product_cost: product_cost,
          };
          resolve(product);
        }
      });
    });
  }
}
