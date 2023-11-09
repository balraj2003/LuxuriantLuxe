import app from './server.js'
import LuxuriantDAO from './dao/LuxuriantDAO.js'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const mongo_username = "luxeluxuriant"
const mongo_password = "1Oy49l5Uomxpe5bP"
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rjozjxo.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err=>{
    console.error(err.stack)
    process.exit(1)
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is listening on port 3000')
    console.log(process.env.master_password)
})