# LuxuriantLuxe
This is a Backend API for the [LuxuriantLux](https://luxuriantluxe.surge.sh/) Ecommerce Website. It is built using ![Node-js](https://img.shields.io/badge/-node.js-333333?style=flat&logo=node.js) ![Express](https://img.shields.io/badge/-Express-333333?style=flat&logo=express) ![MongoDB](https://img.shields.io/badge/-MongoDB-333333?style=flat&logo=mongodb).

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed on your machine:
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.getpostman.com/)

### Installing
- Clone the repository `git clone https://github.com/balraj2003/LuxuriantLuxe`
- Run `npm install` to install all dependencies
- Run `npm start` to start the server
- Run `nodemon server.js` to start the server with nodemon


## Built With
- [NodeJS](https://nodejs.org/en/) - JavaScript Runtime Environment
- [ExpressJS](https://expressjs.com/) - Web Application Framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database


## API Endpoints
### Add order Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/add_order` 
  - **Method**: `POST`
  - **Parameters**:
    - `customer_email` 
	- `customer_phone`
	- `customer_address` 
	- `customer_name` 
	- `customer_order` 
	- `order_cost` 
	- `points_used` 
	- `wantsSubscription` 
	- `updated_customer_points` 
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Get Orders Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/get_orders` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Delete Order Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/delete_order`
  - **Method**: `POST`
  - **Parameters**: 
    - `password` (Master Password)
    - `order_id`
  - **Response Status**:
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable

### Add Customer Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/add_customer` 
  - **Method**: `POST`
  - **Parameters**:
    - `customer_email` 
    - `customer_phone`
    - `customer_address` 
    - `customer_name`
    - `customer_points`
    - `wantsSubscription`  
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Get Customer Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/get_customer` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Get Customerpoints Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/get_customer_points` 
  - **Method**: `POST`
  - **Parameters**:
    - `customer_email` 
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Delete Customer Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/delete_customer` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `customer_email` 
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Get Products Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/get_products` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout


### Change Payment Status Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/change_payment_status` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `order_id` 
    - `payment_status` (paid)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Send Subscription Emails
  - **EndPoint**: `/api/v1/Luxuriant/send_subscription_emails` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `customers` (Array of customer emails)
    - `subject`
    - `content`
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### check Password Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/check_password` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Add Products
  - **EndPoint**: `/api/v1/Luxuriant/add_product`
  - **Method**: `POST`
  - **Parameters**: 
    - `password` (Master Password)
    - `product_details` (Array of product details)
  - **Response Status**:
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable

### Delete Product
  - **EndPoint**: `/api/v1/Luxuriant/delete_product`
  - **Method**: `POST`
  - **Parameters**: 
    - `password` (Master Password)
    - `product_id`
  - **Response Status**:
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable

### Update Product
  - **EndPoint**: `/api/v1/Luxuriant/update_product`
  - **Method**: `POST`
  - **Parameters**: 
    - `password` (Master Password)
    - `product_id`
    - `product_details` (Array of product details)
  - **Response Status**:
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable

### Update Multiple products
  - **EndPoint**: `/api/v1/Luxuriant/update_multiple_products`
  - **Method**: `POST`
  - **Parameters**: 
    - `password` (Master Password)
    - `product_details` (Array of product details)
  - **Response Status**:
    - `200` - OK
    - `400` - Bad request
    - `500` - Internal Server Error
    - `503` - Service Unavailable

### Get FAQS Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/get_faqs` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Add FAQS Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/add_faq` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `faq`
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout
### Delete FAQ Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/delete_faq` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `faq_id`
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout
### Update FAQ Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/update_faq` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `faq_id`
    - `faq`
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout 
### Add Category Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/add_category` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `category` (Array of category details)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Delete Categories Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/delete_category` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `category_id` 
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Update Categories Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/update_category` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
    - `category_id` 
    - `category` (Array of category details)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Get Categories Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/get_categories` 
  - **Method**: `POST`
  - **Parameters**:
    - `password` (Master Password)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

### Add Review Endpoint
  - **EndPoint**: `/api/v1/Luxuriant/add_review` 
  - **Method**: `POST`
  - **Parameters**:
    - `product_id`
    - `review` (Array of review details)
  - **Response Status**: 
    - `200` - OK
    - `400` - Bad request
    - `401` - Unauthorized
    - `500` - Internal Server Error
    - `503` - Service Unavailable
    - `504` - Gateway Timeout

## Authors
- [**Krishnaraj Thadesar**](https://github.com/KrishnarajT)
- [**Parth Zarekar**](https://github.com/Parth4123)



