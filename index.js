// const express = require('express');
// const cors = require('cors');
// const port = process.env.port || 3000;
// const app = express()


// // middleware
// app.use(cors())
// app.use(express.json())



// app.get('/', (req, res ) => {
//     res.send('Smart Backend Was Running')
// })


// app.listen(port, () => {
//     console.log("Smart Server is Running on", port)
// })





const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.port || 3000;



// middleware
app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
    res.send('Smart_deals Server is Running')
})


app.listen(port, () => {
    console.log('Smart Deal server was running', port)
})