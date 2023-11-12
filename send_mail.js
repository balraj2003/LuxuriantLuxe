// Importing the nodemailer module
import nodemailer from "nodemailer";

// Defining an asynchronous function to send an email
export async function sendMail(customer, order, product) {
  // Creating a transporter object using SMTP details
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // Use SSL/TLS
    auth: {
      user: process.env.mail_id, // Sender's email ID
      pass: process.env.mail_pass, // Sender's email password
    },
  });

  // Initializing an empty string to store order details
  let orderDetails = "";
  
  // Looping through each item in the order
  for (let item of order) {
    // Finding the product in the product list that matches the item's product_id
    let productItem = product.find(p => p._id.toString() === item.product_id.toString());
    // If the product is found, use its name. Otherwise, use 'Product not found'
    let productName = productItem ? productItem.product_name : 'Product not found';
    // Adding the product details to the orderDetails string
    orderDetails += `Product name: ${productName}\nQuantity: ${item.quantity}\nPrice: ${item.price}\n\n`;
  }

  // Defining the email options
  let mailOptions = {
    from: process.env.mail_id, // Sender's email ID
    to: customer.customer_email, // Recipient's email ID
    subject: "Order Confirmation", // Email subject
    text: `Your order has been placed successfully. Here are your order details: \n${orderDetails}`, // Email body
  };

  // Defining the maximum number of times to retry sending the email
  const MAX_RETRIES = 3;

  // Trying to send the email up to MAX_RETRIES times
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      // Attempt to send the email
      let info = await transporter.sendMail(mailOptions);
      break; // If the email was sent successfully, break the loop
    } catch (error) {
      // If an error occurred, log the error
      console.error("Error occurred while sending email: %s", error);
      if (i === MAX_RETRIES - 1) { // If this was the last attempt
        // Log a message and return false
        console.error("Failed to send email after %s attempts", MAX_RETRIES);
        return(false)
      } else {
        // Log a message indicating that the function will retry sending the email
        console.log("Retrying to send email...");
      }
    }
  }
  // If the loop completed without returning, log a success message and return true
  if(MAX_RETRIES > 0){
    console.log("Email sent successfully");
    return(true)
  }
}