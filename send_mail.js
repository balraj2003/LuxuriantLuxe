import Mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

const publicKey = process.env.mailjet_public_key;
const privateKey = process.env.mailjet_private_key;

const mj = Mailjet.connect(publicKey, privateKey);

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

	const request = await mj.post("send", { version: "v3.1" }).request({
		Messages: [
			{
				From: {
					Email: "balrajriotavanandi@outlook.com",
					Name: "Luxuriant Luxe Team",
				},
				To: [
					{
						Email: customer.customer_email,
						Name: customer.customer_name, // Assuming customer has a name property
					},
				],
				Subject: "Order Details",
				TextPart: "Order Details",
				HTMLPart: orderDetails,
			},
		],
	});

	const success = request.body.Messages.every(
		(message) => message.Status === "success"
	);
	console.log(success);
	return success;
}

export default sendMail;

async function sendSubscriptionMail(customer_mail_ids, subject, content) {
	const request = await mj.post("send", { version: "v3.1" }).request({
		Messages: [
			{
				From: {
					Email: "balrajriotavanandi@outlook.com",
					Name: "Luxuriant Luxe Team",
				},
				To: [
					{
						Email: customer_mail_id,
						Name: "Customer",
					},
				],
				Subject: subject,
				TextPart: content,
				HTMLPart: content,
			},
		],
	});
	const success = request.body.Messages.every(
		(message) => message.Status === "success"
	);
	console.log(success);
	return success;
}
