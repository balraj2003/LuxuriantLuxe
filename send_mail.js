// let ElasticEmail = require("@elasticemail/elasticemail-client");
import ElasticEmail from "@elasticemail/elasticemail-client";

async function sendMail(customer, order, product) {
	let defaultClient = ElasticEmail.ApiClient.instance;

	let apikey = defaultClient.authentications["apikey"];
	apikey.apiKey =
		"E14DF5EE274AA52F3A0C88FF32C00B199ADDD6F90C1174F0B1CC993FEE536F5738A03D047FE0C4EF79BD54638B80861D";

	let api = new ElasticEmail.EmailsApi();

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
					Content: "My test email content ;)",
				}),
			],
			Subject: "JS EE lib test",
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
