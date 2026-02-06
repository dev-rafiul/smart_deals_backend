const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express') 
const cors = require('cors');
const app = express()
const port = process.env.port || 3000;
// connect mongodb with username + password
const uri = "mongodb+srv://smart_deal:Inuw2fggK4hdm1g8@cluster0.3o3pwj7.mongodb.net/?appName=Cluster0";

// mongodb
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




// middleware
app.use(cors())
app.use(express.json())








async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('Smart_deals Server is Running')
})


app.listen(port, () => {
    console.log('Smart Deal server was running', port)
})