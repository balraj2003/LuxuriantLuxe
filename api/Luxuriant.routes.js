// Importing necessary modules
import express from "express";
import LuxuriantCtrl from "./Luxuriant.controller.js";

// Creating a new router
const router = express.Router();

// Route for getting Luxuriant data
router.route("/").get(LuxuriantCtrl.apiGetLuxuriant);

// Route for adding an order
router.route("/add_order").post(LuxuriantCtrl.apiAddOrdersLuxuriant);

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

// Route for updating multiple products
router
	.route("/update_multiple_products")
	.post(LuxuriantCtrl.apiUpdateMultipleProducts);

// Exporting the router as a module
export default router;
