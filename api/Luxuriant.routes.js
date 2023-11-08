import express from "express";
import LuxuriantCtrl from "./Luxuriant.controller.js";

const router = express.Router();

router.route("/").get(LuxuriantCtrl.apiGetLuxuriant);
router.route("/add_order").post(LuxuriantCtrl.apiAddOrdersLuxuriant);
router.route("/add_product").post(LuxuriantCtrl.apiAddProductsLuxuriant);
export default router;