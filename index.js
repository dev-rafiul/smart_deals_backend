const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


app.get('/', (req, res) => {
    res.send('Smart_deals Server is Running')
})





async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // collection create

    // collection create & name decide here
    const db = client.db('smart_db');
    const productCollection = db.collection('products');


    // total products
    app.get('/products', async(req, res) => {
        const cursor = productCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('products/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await productCollection.findOne(query)
        res.send(result)
        
    })


    // create 
    app.post('/products', async(req, res) => {
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct)
        res.send(result)
    })



    // app.delete('/products/:id',async (req, res) => {
    //     const id = req.params.id;
    //     const query = {_id: new ObjectId(id)}
    //     const result = await productCollection.deleteOne(query)
    //     res.send(result)
    // })

    //update
    app.patch('/products/:id', async (req, res) => {
        const id = req.params.id;
        const updatedProduct = req.body;
        const query = {_id: new ObjectId(id)}
        const update = {
            $set: {
                name: updatedProduct.name,
                price: updatedProduct.price
            }
        }
        // const options = {}
        const result = await productCollection.updateOne(query, update)
        res.send(result)
    })



    // delete
    app.delete('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await productCollection.deleteOne(query)
        res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);












app.listen(port, () => {
    console.log('Smart Deal server was running', port)
})