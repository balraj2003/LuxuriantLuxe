import app from './server.js'
// const express = require('express')

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is listening on port 3000')
})
