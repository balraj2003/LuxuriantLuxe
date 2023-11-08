import LuxuriantDAO from "../dao/LuxuriantDAO.js";
const dao = new LuxuriantDAO(); // Create a new instance of the LuxuriantDAO class
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
            if (order){
                res.json(order.response)
            }
            else{
                res.json({message: "failure"})
            }
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
    static async apiAddProductsLuxuriant(req, res, next){
        try{
            const product_name = req.query.product_name
            const product_cost = req.query.product_cost

            console.log("product_cost: " + product_cost)
            const product = await dao.addProduct(product_name,product_cost);
            if (product){
                res.json({
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_cost: product.product_cost,
                    message: "success"})
            }else{
                res.json({message: "failure"})
            }
        }catch(e){
            res.status(500).json({error: e.message})
            console.log(e.message)
        }
    }
}