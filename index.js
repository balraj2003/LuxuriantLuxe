// Importing necessary modules and files
import app from './server.js'
import LuxuriantDAO from './dao/LuxuriantDAO.js'
import mongodb from 'mongodb'

// Creating a MongoClient object from mongodb
const MongoClient = mongodb.MongoClient

// Fetching MongoDB username and password from environment variables
const mongo_username = process.env.mongo_username 
const mongo_password = process.env.mongo_password

// Constructing the MongoDB connection string
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rjozjxo.mongodb.net/?retryWrites=true&w=majority`

// Connecting to MongoDB
MongoClient.connect(uri)
    .catch(err => {
        // If there's an error during connection, log the error and exit the process
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        // Once connected, inject the client into the LuxuriantDAO
        await LuxuriantDAO.InjectDB(client)

        // Start the server listening on the specified port
        app.listen(process.env.PORT || 3000, () => {
            console.log('Server is listening')
        })
    })