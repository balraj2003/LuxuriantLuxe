import nodemailer from "nodemailer";

export async function sendMail(customer, order, product) {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.mail_id,
      pass: process.env.mail_pass,
    },
  });

  let orderDetails = "";
  
for (let item of order) {
    let productItem = product.find(p =>{
        return p._id.toString() === item.product_id.toString();
    })
    console.log("productItem: " + productItem)
    let productName = productItem ? productItem.product_name : 'Product not found';
    orderDetails += `Product name: ${productName}\nQuantity: ${item.quantity}\nPrice: ${item.price}\n\n`;
}

  let mailOptions = {
    // from: process.env.mail_id,
    from: process.env.mail_id,
    to: customer.customer_email,
    subject: "Order Confirmation",
    text: `Your order has been placed successfully. Here are your order details: \n${orderDetails}`,
  };
  const MAX_RETRIES = 3;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      break; // If the email was sent successfully, break the loop
    } catch (error) {
      console.error("Error occurred while sending email: %s", error);
      if (i === MAX_RETRIES - 1) { // If this was the last attempt
        console.error("Failed to send email after %s attempts", MAX_RETRIES);
      } else {
        console.log("Retrying to send email...");
      }
    }
  }
  if(MAX_RETRIES > 0){
    console.log("Email sent successfully");
  }
}