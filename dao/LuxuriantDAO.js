import { MongoClient, ObjectId } from "mongodb";

export default class LuxuriantDAO {
  constructor() {
    // const mongo_username = process.env.mongo_username
    const mongo_username = "luxeluxuriant"
    // const mongo_password = process.env.mongo_password
    const mongo_password = "1Oy49l5Uomxpe5bP"
    this.uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rjozjxo.mongodb.net/?retryWrites=true&w=majority`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db("cluster0"); 
  }

  async addOrder(
    customer_email,
    customer_phone,
    customer_address,
    customer_name,
    customer_order,
    order_cost
  ) {
    let customer = await this.db.collection('customers').findOne({ customer_email });
    if (!customer) {
      const result = await this.db.collection('customers').insertOne({ customer_name, customer_address, customer_email, customer_phone });
      customer = { _id: result.insertedId };
      console.log("Customer result " + result)
      // customer = result.ops[0];
      // console.log("Customer result.ops " + customer)
    }
    // parse the order
    customer_order = JSON.parse(customer_order);

    const order = {
      order_date: new Date(),
      order_cost,
      payment_status: "pending",
      customer_id: customer._id,
      order_details: customer_order.map(product => ({
        product_id: new ObjectId(product.product_id),
        quantity: product.quantity,
        price: product.cost
      }))
    };
  
    const orderResult = await this.db.collection('orders').insertOne(order);
    
    console.log("Order result " + orderResult)
    
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
    const result = await this.db.collection('customers').find({}).toArray();
    return result;
  }

  async getProducts(){
    const result = await this.db.collection('products').find({}).toArray();
    return result;
  }

  async getOrders(){
    const result = await this.db.collection('orders').find({}).toArray();
    return result;
  }

  async changePaymentStatus(order_id, payment_status){
    const result = await this.db.collection('orders').updateOne({_id: new ObjectId(order_id)}, {$set: {payment_status: payment_status}});
    console.log("Result " + result)
    if (result){
      return{
        message:"Success"
      }
    }else{
      return{
        message:"Failure"
      }
    }
  }

  async addProduct() {
    const products = [
      { product_name: 'Product 1', product_cost: 100 },
      { product_name: 'Product 2', product_cost: 200 },
      { product_name: 'Product 3', product_cost: 300 },
      // Add more products as needed
  ];

    if(await this.db.collection('products').insertMany(products)){
      console.log("Products added successfully");
      return products;
    }else{
      console.log("Failure in adding products");
    }

    
  }
}
