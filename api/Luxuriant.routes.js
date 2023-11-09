import express from "express";
import LuxuriantCtrl from "./Luxuriant.controller.js";

const router = express.Router();

router.route("/").get(LuxuriantCtrl.apiGetLuxuriant);
router.route("/add_order").post(LuxuriantCtrl.apiAddOrdersLuxuriant);
router.route("/get_customers").post(LuxuriantCtrl.apiGetCustomers);
router.route("/get_products").post(LuxuriantCtrl.apiGetProducts);
router.route("/get_orders").post(LuxuriantCtrl.apiGetOrders);
router.route("/change_payment_status").post(LuxuriantCtrl.apiChangePaymentStatus);
router.route("/add_product").get(LuxuriantCtrl.apiAddProductsLuxuriant);

export default router;