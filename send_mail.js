import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendMail(customer, order, product) {
  console.log("customer: " + customer.customer_email);
  console.log("order: " + order);
  console.log("product: " + product);
  console.log("process.env.Mail_Usr: " + process.env.Mail_Usr);
  console.log("process.env.Mail_Pass: " + process.env.Mail_Pass);
	let transporter = nodemailer.createTransport({
		host: "smtp-mail.outlook.com",
		port: 587,
		secure: false,
		auth: {
			user: "balrajriotavanandi@outlook.com",
			pass: "Petroleum@2025",
		},
	});

	let orderDetails = "";

	for (let item of order) {
		let productItem = product.find((p) => {
			return p._id.toString() === item.product_id.toString();
		});
		console.log("productItem: " + productItem);
		let productName = productItem
			? productItem.product_name
			: "Product not found";
		orderDetails += `Product name: ${productName}\nQuantity: ${item.quantity}\nPrice: ${item.price}\n\n`;
	}

	let mailOptions = {
		from: "balrajriotavanandi@outlook.com",
		to: customer.customer_email,
		subject: "Order Confirmation",
		text: `Your order has been placed successfully. Here are your order details: \n${orderDetails}`,
	};

	let info = new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			} else {
				resolve(info);
			}
		});
	});

	return info
		.then((data) => {
			console.log("Mail sent successfully: " + data.response);
			return true;
		})
		.catch((error) => {
			console.log("Error: " + error);
			return false;
		});
}

// write test function to be run by node
sendMail(
	{
		customer_email: "kpt.krishnaraj@gmail.com",
	},
	[
		{
			product_id: "5f8b7d2c1c9d440000f3e9b0",
			quantity: 1,
			price: 100,
		},
	],
	[
		{
			_id: "5f8b7d2c1c9d440000f3e9b0",
			product_name: "Product 1",
		},
	]
)
	.then((data) => {
		console.log("Data: " + data);
	})
	.catch((error) => {
		console.log("Error: " + error);
	});
