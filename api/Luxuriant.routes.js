// Importing necessary modules
import express from "express";
import LuxuriantCtrl from "./Luxuriant.controller.js";

// Creating a new router
const router = express.Router();

// Route for getting Luxuriant data
router.route("/").get(LuxuriantCtrl.apiGetLuxuriant);

// Route for adding an order
router.route("/add_order").post(LuxuriantCtrl.apiAddOrdersLuxuriant);

// Route for adding a customer
router.route("/add_customer").post(LuxuriantCtrl.apiAddCustomer);

// Route for getting customers
router.route("/get_customers").post(LuxuriantCtrl.apiGetCustomers);

// Route for Getting customer points
router.route("/get_customer_points").post(LuxuriantCtrl.apiGetCustomerPoints);

// Route for Deleting a customer
router.route("/delete_customer").post(LuxuriantCtrl.apiDeleteCustomer);

// Route for getting products
router.route("/get_products").post(LuxuriantCtrl.apiGetProducts);

// Route for getting orders
router.route("/get_orders").post(LuxuriantCtrl.apiGetOrders);

// Route for changing payment status
router
	.route("/change_payment_status")
	.post(LuxuriantCtrl.apiChangePaymentStatus);

// Route for sending batch subscription emails
router
	.route("/send_subscription_emails")
	.post(LuxuriantCtrl.apiSendSubscriptionEmails);

// Route for checking password
router.route("/check_password").post(LuxuriantCtrl.apiCheckPassword);

// Route for adding a product
router.route("/add_product").post(LuxuriantCtrl.apiAddProductsLuxuriant);

// Route for deleting a product
router.route("/delete_product").post(LuxuriantCtrl.apiDeleteProduct);

// Route for updating a product
router.route("/update_product").post(LuxuriantCtrl.apiUpdateProduct);

// Route for deleting order
router.route("/delete_order").post(LuxuriantCtrl.apiDeleteOrder);

// Route for getting all faqs
router.route("/get_faqs").post(LuxuriantCtrl.apiGetFaqs);

// Route for adding a faq
router.route("/add_faq").post(LuxuriantCtrl.apiAddFaq);

// Route for deleting a faq
router.route("/delete_faq").post(LuxuriantCtrl.apiDeleteFaq);

// Route for updating a faq
router.route("/update_faq").post(LuxuriantCtrl.apiUpdateFaq);

// Route for adding a category
router.route("/add_category").post(LuxuriantCtrl.apiAddCategory);

// Route for deleting a category
router.route("/delete_category").post(LuxuriantCtrl.apiDeleteCategory);

// Route for updating a category
router.route("/update_category").post(LuxuriantCtrl.apiUpdateCategory);

// Route for getting all categories
router.route("/get_categories").post(LuxuriantCtrl.apiGetCategories);

// Route for adding a review to a product
router.route("/add_review").post(LuxuriantCtrl.apiAddReview);

// Route for deleting a review
router.route("/update_static_stuff").post(LuxuriantCtrl.apiUpdateStaticStuff);

// Route for adding a review to a product
router.route("/add_static_stuff").post(LuxuriantCtrl.apiAddStaticStuff);

// Route for deleting a review
router.route("/delete_static_stuff").post(LuxuriantCtrl.apiDeleteStaticStuff);

// Route for getting static stuff
router.route("/get_static_stuff").post(LuxuriantCtrl.apiGetStaticStuff);

// Route for updating multiple products
router
	.route("/update_multiple_products")
	.post(LuxuriantCtrl.apiUpdateMultipleProducts);

// Exporting the router as a module
export default router;
