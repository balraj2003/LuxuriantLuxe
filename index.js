import app from './server.js'
import LuxuriantDAO from './dao/LuxuriantDAO.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const MongoClient = mongodb.MongoClient
const uri = process.env.Mongo_Uri 

MongoClient.connect(uri).catch(err=>{
    console.error(err.stack)
    process.exit(1)
}).catch(err=>{
    console.error(err.stack)
    process.exit(1)
}).then(async client =>{
    await LuxuriantDAO.InjectDB(client)
    app.listen(process.env.PORT || 3000, ()=>{
        console.log('Server is listening on port 3000')
    })
})