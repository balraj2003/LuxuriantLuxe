import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendMail(customer, order, product) {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.Mail_Usr,
      pass: process.env.Mail_Pass,  
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
    from: "balrajriotavanandi@outlook.com",
    to: customer.customer_email,
    subject: "Order Confirmation",
    text: `Your order has been placed successfully. Here are your order details: \n${orderDetails}`,
  };
  const MAX_RETRIES = 3;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {

      let info = await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
      console.log("Message sent: %s", info.messageId);
      return true; // If the email was sent successfully, return true
    } catch (error) {
      console.error("Error occurred while sending email: %s", error);
      if (i === MAX_RETRIES - 1) { // If this was the last attempt
        console.error("Failed to send email after %s attempts", MAX_RETRIES);
      } else {
        console.log("Retrying to send email...");
      }
    }
  }
  return false; // If the email was not sent successfully, return false
}