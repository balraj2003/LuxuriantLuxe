import express from "express";
import LuxuriantCtrl from "./Luxuriant.controller.js";

const router = express.Router();

router.route("/").get(LuxuriantCtrl.apiGetLuxuriant);


export default router;