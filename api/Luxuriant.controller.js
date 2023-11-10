import { json } from "express";
import LuxuriantDAO from "../dao/LuxuriantDAO.js";
const dao = new LuxuriantDAO(); // Create a new instance of the LuxuriantDAO class
const master_password = process.env.master_password;
// const master_password = "119d22515f91b4be";
export default class LuxuriantController{
    static async apiGetLuxuriant(req, res, next){
        try{
            res.json({message: "Hello World!"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiAddOrdersLuxuriant(req, res, next){
        try{
            const customer_email = req.query.customer_email
            const customer_phone = req.query.customer_phone
            const customer_address = req.query.customer_address
            const customer_name = req.query.customer_name
            const customer_order = req.query.customer_order;
            const order_cost = req.query.order_cost;
            
        
            const order = await dao.addOrder(
                customer_email,
                customer_phone,
                customer_address,
                customer_name,
                customer_order,
                order_cost
            );
            if (order.message === "Success"){
                res.json({
                    order_id: order.order_id,
                    order_cost: order.order_cost,
                    payment_status: order.payment_status,
                    message: order.message})
                }
            else{
                res.json({message: order.message})
            }
         
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetCustomers (req,res,next){
        try{

            const pass = req.query.password;
            if (pass === master_password){
                const customers = await dao.getCustomers();
                if (customers){
                    res.json(customers)
                }else{
                    res.json({message: "No customers found"})
                }

            }else{
                res.json({message: "Incorrect password"})
            }
        }catch(e){
            res.status(500).json({error: e.message})
        }

    }

    static async apiGetProducts (req,res,next){
        try{
            const pass = req.query.password;
            if (pass === master_password){
                const products = await dao.getProducts();
                if (products){
                    res.json(products)
                }else{
                    res.json({message: "No products found"})
                }

            }else{
                res.json({message: "Incorrect password"})
            }
        }catch(e){
            res.status(500).json({error: e.message})
        }

    }

    static async apiGetOrders(req,res,next){
        try{
            const pass = req.query.password;
            if (pass === master_password){
                const orders = await dao.getOrders();
                if (orders){
                    res.json(orders)
                }else{
                    res.json({message: "No orders found"})
                }

            }else{
                res.json({message: "Incorrect password"})
            }
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiChangePaymentStatus(req,res,next){
        try{
            const pass = req.query.password;
            const order_id = req.query.order_id;
            const payment_status = req.query.payment_status;

            if (pass === master_password){
                const order = await dao.changePaymentStatus(order_id, payment_status);
                if (order){
                    res.json(order)
                }else{
                    res.json({message: "No orders found"})
                }
        }
    }catch(e){
        res.status(500).json({error: e.message})
    }
    }

    static async apiAddProductsLuxuriant(req, res, next){
        try{
            const product = await dao.addProduct();
            if (product){
                res.json({
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_cost: product.product_cost,
                    message: "Product added successfully"})
            }else{
                res.json({message: "Failure in adding product"})
            }
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}