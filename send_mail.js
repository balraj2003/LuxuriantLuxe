import dotenv from "dotenv";
dotenv.config();

const mailjet = require("node-mailjet").connect(
	process.env.mailjet_public_key,
	process.env.mailjet_private_key
);

async function sendMail(customer, order, product) {
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

	const request = mailjet.post("send").request({
		FromEmail: process.env.Mail_Usr,
		FromName: "Luxuriant Luxe Team",
		Subject: "Your Order has been placed!",
		"Text-part": "Your Order Details are given below. ",
		"Html-part": orderDetails,
		Recipients: [{ Email: customer.email, Name: customer.name }],
	});

	const success = request
		.then((result) => {
			console.log(result.body);
			return true;
		})
		.catch((err) => {
			console.log(err.statusCode);
			return false;
		});
	// log
	console.log(success);
	return success;
}

export default sendMail;

async function sendSubscriptionMail(customer_details, subject, content) {
	// customer details looks like this:
	// [
	// 	{
	// 		name: "John Doe",
	// 		email: "johndoe@example",
	// 	},
	// 	{
	// 		name: "Jane Doe",
	// 		email: "janedoe@example",
	// 	},
	// ];
	let recipients = [];
	for (let customer of customer_details) {
		recipients.push({
			Email: customer.email,
			Name: customer.name,
		});
	}

	const request = mailjet.post("send").request({
		FromEmail: process.env.Mail_Usr,
		FromName: "Luxuriant Luxe Team",
		Subject: subject,
		"Text-part": content,
		"Html-part": content,
		Recipients: recipients,
	});

	const success = request
		.then((result) => {
			console.log(result.body);
			return true;
		})
		.catch((err) => {
			console.log(err.statusCode);
			return false;
		});
	console.log(success);
	return success;
}
