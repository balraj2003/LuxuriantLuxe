import { ObjectId } from "mongodb";
import moment from 'moment-timezone';
let cluster0;

export default class LuxuriantDAO {
  static async InjectDB(conn) {
    if(cluster0){
      return;
    }
    try{
      cluster0 = await conn.db("cluster0");
    }catch(e){
      console.error(
        `Unable to establish a collection handle in LuxuriantDAO: ${e}`,
      )
    }
  }

  async addOrder(
    customer_email,
    customer_phone,
    customer_address,
    customer_name,
    customer_order,
    order_cost
  ) {
    let customer = await cluster0.collection('customers').findOne({ customer_email });
    if (!customer) {
      const result = await cluster0.collection('customers').insertOne({ customer_name, customer_address, customer_email, customer_phone });
      customer = { _id: result.insertedId };
      console.log("Customer result " + result)
     
    }
    // parse the order
    customer_order = JSON.parse(customer_order);

    const order = {
      order_date: moment().tz("Asia/Kolkata").format('DD/MM/YY'),
      order_time: moment().tz("Asia/Kolkata").format('HH:mm:ss'),
      order_cost,
      payment_status: "pending",
      customer_id: customer._id,
      order_details: customer_order.map(product => ({
        product_id: new ObjectId(product.product_id),
        quantity: product.quantity,
        price: product.cost
      }))
    };

    
    const orderResult = await cluster0.collection('orders').insertOne(order);
    
    
    if (orderResult){
      return{
        order_id: orderResult.insertedId,
        order_cost: order_cost,
        payment_status: "pending",
        message:"Success"
      }
    }else{
      return{
        message:"Failure"
      }
    }
  }

  async getCustomers() {
    const result = await cluster0.collection('customers').find({}).toArray();
    return result;
  }

  async getProducts(){
    const result = await cluster0.collection('products').find({}).toArray();
    return result;
  }

  async getOrders(){
    const result = await cluster0.collection('orders').find({}).toArray();
    return result;
  }

  async changePaymentStatus(order_id, payment_status){
    const result = await cluster0.collection('orders').findOneAndUpdate(
      { _id: new ObjectId(order_id) },
      { $set: { payment_status: payment_status } },
      { returnOriginal: false }
    );   
    console.log("change payment status Result " + result)
    if (result){
      return{
        order_details: result.order_details,
        customer_id: result.customer_id,
        message:"Success"
      }
    }else{
      return{
        message:"Failure"
      }
    }
  }
  async getCustomerEmail(customer_id){
    const result = await cluster0.collection('customers').findOne({ _id: new ObjectId(customer_id) });
    return result;
  }

  async addProduct() {
    const products = [
      { product_name: 'Product 1', product_cost: 100 },
      { product_name: 'Product 2', product_cost: 200 },
      { product_name: 'Product 3', product_cost: 300 },
      // Add more products as needed
  ];

    if(await cluster0.collection('products').insertMany(products)){
      console.log("Products added successfully");
      return products;
    }else{
      console.log("Failure in adding products");
    }

    
  }
}
