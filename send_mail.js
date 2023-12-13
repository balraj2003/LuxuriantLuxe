// let ElasticEmail = require("@elasticemail/elasticemail-client");
import ElasticEmail from "@elasticemail/elasticemail-client";
import dotenv from "dotenv";
dotenv.config();

async function sendMail(customer, order, product) {
	let defaultClient = ElasticEmail.ApiClient.instance;

	let apikey = defaultClient.authentications["apikey"];
	apikey.apiKey = process.env.API_KEY;

	let api = new ElasticEmail.EmailsApi();

	// Constructing the orderDetails string
	let orderDetails = "";
	for (let item of order) {
	  let productItem = product.find(
		(p) => p._id.toString() === item.product_id.toString()
	  );
	  let productName = productItem
		? productItem.product_name
		: "Product not found";
	  orderDetails += `Product name: ${productName}<br>Quantity: ${item.quantity}<br>Price: ${item.price}<br><br>`;
	}

	let email = ElasticEmail.EmailMessageData.constructFromObject({
		Recipients: [
			new ElasticEmail.EmailRecipient(
				customer.customer_email
			),
		],
		Content: {
			Body: [
				ElasticEmail.BodyPart.constructFromObject({
					ContentType: "HTML",
					Content: `<h1>Your order has been placed successfully.</h1>
					<p>Here are your order details:</p>
					<div style="margin-left: 20px;">
					  ${orderDetails.replace(/<br>/g, '</div><div style="margin-left: 20px;">')}
					</div>
					<p>Thank you for your purchase!</p>`,
				}),
			],
			Subject: "Order Details",
			From: "krishnaraj.kpt@outlook.com",
		},
	});

	return new Promise((resolve, reject) => {
		api.emailsPost(email, (error, response) => {
		  if (error) {
			console.error(error);
			reject(false);
		  } else {
			console.log(response);
			console.log("API called successfully.");
			resolve(true);
		  }
		});
	  });
}

export default sendMail;
