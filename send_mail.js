import dotenv from "dotenv";
import Mailjet from "node-mailjet";

dotenv.config();

const publicKey = process.env.mailjet_public_key;
const privateKey = process.env.mailjet_private_key;
const mailjet = Mailjet.connect(publicKey, privateKey);

async function sendMail(customer, order, product) {
	// Constructing the orderDetails string
	let starting_text = `
		<h1>Thank you for shopping with us, ${customer.name}!</h1>
		<br>
		The Order you placed at ${order.order_date} ${order.order_time} has been successfully placed, and is being processed. <br>
		It will be delivered to your provided address: ${customer.customer_address}, Shortly. <br>
		<h2>Order Details:</h2>
		<br>
	`;
	let orderDetails = "";
	for (let item of order) {
		let productItem = product.find(
			(p) => p._id.toString() === item.product_id.toString()
		);
		let productName = productItem
			? productItem.product_name
			: "Product not found";
		orderDetails += `
				<tr>
					<td style="border: 1px solid black; padding: 8px;">${productName}</td>
					<td style="border: 1px solid black; padding: 8px;">${item.quantity}</td>
					<td style="border: 1px solid black; padding: 8px;">${item.price}</td>
				</tr>`;
	}
	orderDetails =
		starting_text +
		`
				<table style="border-collapse: collapse; width: 100%;">
					<thead>
						<tr>
							<th style="border: 1px solid black; padding: 8px;">Product Name</th>
							<th style="border: 1px solid black; padding: 8px;">Quantity</th>
							<th style="border: 1px solid black; padding: 8px;">Price</th>
						</tr>
					</thead>
					<tbody>
						${orderDetails}
					</tbody>
				</table>`;
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
	return success;
}

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

export { sendMail, sendSubscriptionMail };

// test code

sendMail(
	{
		email: "kpt.krishnaraj@gmail.com",
		name: "Krishnaraj",
	},
	[
		{
			product_id: "60a4f0e1b9b4a4b4f8e4e6e3",
			quantity: 2,
			price: 100,
		},
		{
			product_id: "60a4f0e1b9b4a4b4f8e4adsfae6e3",
			quantity: 3,
			price: 400,
		},
	],
	[
		{
			_id: "60a4f0e1b9b4a4b4f8e4e6e3",
			product_name: "Test Product",
		},
		{
			_id: "60a4f0e1b9b4a4b4f8e4adsfae6e3",
			product_name: "Test Product 2",
		},
	]
);

// sendSubscriptionMail(
// 	[
// 		{
// 			name: "Krishnaraj",
// 			email: "johndoe@example",
// 		},
// 		{
// 			name: "Jane Doe",
// 			email: "janedoe@example",
// 		},
// 	],
// 	"Test Subject",
// 	"Test Content"
// );
