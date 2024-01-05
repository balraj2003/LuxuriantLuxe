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
			const points_used = req.query.points_used;
			const updated_customer_points = req.query.updated_customer_points;

			// Add the order using the DAO
			const order = await dao.addOrder(
				customer_email,
				customer_phone,
				customer_address,
				customer_name,
				customer_order,
				updated_customer_points,
				order_cost,
				points_used
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

	// Method to add customer
	static async apiAddCustomer(req, res, next) {
		try {
			// Extract customer details from the request query
			const customer_details = req.body.customer_details;

			// Add the customer using the DAO
			await dao
				.addCustomer(customer_details)
				.then((customer) => {
					// Send a JSON response with the customer details if the customer was added successfully
					if (customer) {
						res.json({
							customer_details: customer,
							message: "success",
						});
					} else {
						// Send a JSON response with an error message if the customer was not added successfully
						res.json({ message: "failure" });
					}
				})
				.catch((e) => {
					// Send a 500 status code and the error message if an error occurs
					res.status(500).json({ error: e.message });
				});
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to get customer points
	static async apiGetCustomerPoints(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Get the customer points using the DAO
				const customer_points = await dao.getCustomerPoints(
					req.body.customer_id
				);

				// Send a JSON response with the customer points if they were found
				if (customer_points) {
					res.json({
						customer_points: customer_points,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if no customer points were found
					res.json({ message: "failure" });
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

	// Method to delete customer
	static async apiDeleteCustomer(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Delete the customer using the DAO
				const customer = await dao.deleteCustomer(req.body.customer_id);

				// Send a JSON response with the customer details if the customer was deleted successfully
				if (customer) {
					res.json({
						customer_details: customer,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the customer was not deleted successfully
					res.json({ message: "failure" });
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
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the product was not deleted successfully
					res.json({ message: "failure" });
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
						console.log(result);
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

	// Method to delete order
	static async apiDeleteOrder(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			if (pass === master_password) {
				// Delete the order using the DAO
				const order = await dao.deleteOrder(req.body.order_id);

				// Send a JSON response with the order details if the order was deleted successfully
				if (order) {
					res.json({
						order_details: order,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the order was not deleted successfully
					res.json({ message: "failure" });
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

	// Method to get all faqs
	static async apiGetFaqs(req, res, next) {
		try {
			// Check if the provided password matches the master password
			// const pass = req.body.password;
			// if (pass === master_password) {
			// Get the faqs using the DAO
			const faqs = await dao.getFaqs();

			// Send a JSON response with the faqs if they were found
			if (faqs) {
				res.json({ faqs: faqs, message: "Success" });
			} else {
				// Send a JSON response with an error message if no faqs were found
				res.json({ message: "No faqs found" });
			}
			// } else {
			// Send a JSON response with an error message if the password is incorrect
			// res.json({ message: "Incorrect password" });
			// }
		} catch (e) {
			// Send a 500 status code and the error message if an error occurs
			console.error(e);
			res.status(500).json({ error: e.message });
		}
	}

	// Method to add faq
	static async apiAddFaq(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			const faq = req.body.faq;
			if (pass === master_password) {
				// Add the faq using the DAO
				const result = await dao.addFaq(faq);

				// Send a JSON response with the faq details if the faq was added successfully
				if (result) {
					res.json({
						faq_details: result,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the faq was not added successfully
					res.json({ message: "failure" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to delete faq
	static async apiDeleteFaq(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			const faq_id = req.body.faq_id;
			if (pass === master_password) {
				// Delete the faq using the DAO
				const faq = await dao.deleteFaq(faq_id);

				// Send a JSON response with the faq details if the faq was deleted successfully
				if (faq) {
					res.json({
						faq_details: faq,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the faq was not deleted successfully
					res.json({ message: "failure" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to update faq
	static async apiUpdateFaq(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			const faq_id = req.body.faq_id;
			const faq = req.body.faq;
			if (pass === master_password) {
				// Update the faq using the DAO
				const result = await dao.updateFaq(faq_id, faq);

				// Send a JSON response with the faq details if the faq was updated successfully
				if (result) {
					res.json({
						faq_details: result,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the faq was not updated successfully
					res.json({ message: "failure" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to add category
	static async apiAddCategory(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			const category = req.body.category;
			if (pass === master_password) {
				// Add the category using the DAO
				const result = await dao.addCategory(category);

				// Send a JSON response with the category details if the category was added successfully
				if (result) {
					res.json({
						category_details: result,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the category was not added successfully
					res.json({ message: "failure" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to delete category
	static async apiDeleteCategory(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			const category_id = req.body.category_id;
			if (pass === master_password) {
				// Delete the category using the DAO
				const category = await dao.deleteCategory(category_id);

				// Send a JSON response with the category details if the category was deleted successfully
				if (category) {
					res.json({
						category_details: category,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the category was not deleted successfully
					res.json({ message: "failure" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to update category
	static async apiUpdateCategory(req, res, next) {
		try {
			// Check if the provided password matches the master password
			const pass = req.body.password;
			const category_id = req.body.category_id;
			const category = req.body.category;
			if (pass === master_password) {
				// Update the category using the DAO
				const result = await dao.updateCategory(category_id, category);

				// Send a JSON response with the category details if the category was updated successfully
				if (result) {
					res.json({
						category_details: result,
						message: "success",
					});
				} else {
					// Send a JSON response with an error message if the category was not updated successfully
					res.json({ message: "failure" });
				}
			} else {
				// Send a JSON response with a failure message if the password is incorrect
				res.json({ message: "Incorrect password" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to get all categories
	static async apiGetCategories(req, res, next) {
		try {
			// // Check if the provided password matches the master password
			// const pass = req.body.password;
			// if (pass === master_password) {
			// Get the categories using the DAO
			const categories = await dao.getCategories();

			// Send a JSON response with the categories if they were found
			if (categories) {
				res.json({ categories: categories, message: "Success" });
			} else {
				// Send a JSON response with an error message if no categories were found
				res.json({ message: "No categories found" });
			}
			// } else {
			// Send a JSON response with an error message if the password is incorrect
			// res.json({ message: "Incorrect password" });
			// }
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}

	// Method to Add review to a product
	static async apiAddReview(req, res, next) {
		try {
			// Get the categories using the DAO
			const reviews = await dao.addReview(
				req.body.product_id,
				req.body.reviews
			);

			// Send a JSON response with the categories if they were found
			if (reviews) {
				res.json({ reviews: reviews, message: "Success" });
			} else {
				// Send a JSON response with an error message if no categories were found
				res.json({ message: "No review found" });
			}
		} catch (e) {
			console.error(e);
			// Send a 500 status code and the error message if an error occurs
			res.status(500).json({ error: e.message });
		}
	}
}
