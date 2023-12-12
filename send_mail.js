let ElasticEmail = require("@elasticemail/elasticemail-client");

async function sendMail() {
	let defaultClient = ElasticEmail.ApiClient.instance;

	let apikey = defaultClient.authentications["apikey"];
	apikey.apiKey =
		"E14DF5EE274AA52F3A0C88FF32C00B199ADDD6F90C1174F0B1CC993FEE536F5738A03D047FE0C4EF79BD54638B80861D";

	let api = new ElasticEmail.EmailsApi();

	let email = ElasticEmail.EmailMessageData.constructFromObject({
		Recipients: [
			new ElasticEmail.EmailRecipient(
				"krishnaraj <kpt.krishnaraj@gmail.com>"
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

  let sent = false;
	var callback = function (error, data, response) {
		if (error) {
      console.error(error);
      sent = false;
		} else {
			console.log(data);
			console.log("API called successfully.");
      sent = true;
    }
	};
	await api.emailsPost(email, callback);
  if (sent) {
    return true;
  }
  return false;
}

export default sendMail;
