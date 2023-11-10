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
    from: "parthzarekar4@outlook.com",
    to: customer.customer_email,
    subject: "Order Confirmation",
    text: `Your order has been placed successfully. Here are your order details: \n${orderDetails}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred while sending email: %s", error);
  }
}