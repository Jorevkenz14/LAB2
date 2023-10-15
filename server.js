const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/products.js")
const app = express()
app.use(express.json())

//Display's (get) homepage
app.get("/", (req, res) => {
    res.send ("Message: Hello Valued Customer and Welcome to NOVO Marketplace");
});

//Display's (post) homepage 
app.post("/post", (req, res) => {
    res.send ("Message: .Post to NOVO Marketplace");
});

 //Get all Products
 app.get("/api/products", async (req, res) => {
    try {
         const products = await Product.find({});
         res.status(200).json(products);
    } catch (error) {
         res.status(500).json({message: error.message})
    }
 });

 //Get product by Id
 app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })

 //Add new Product
app.post("/api/products", async (req, res) => {
    try {
         const product = await Product.create(req.body)
         res.status(200).json(product);
 
    } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message})
    }
 });

  //Update product by Id
  app.put('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        //Cannot find product Id from database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${req.params.id}`})
        }
        const updatedProduct = await Product.findById(req.params.id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })

  //Remove product by Id
  app.delete('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(req.params.id);
        //Cannot find product Id from database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${req.params.id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })

 //Removing all products
 app.delete("/api/products", async (req, res) => {
    try {
         const products = await Product.deleteMany({});
         res.status(200).json(products);
    } catch (error) {
         res.status(500).json({message: error.message})
    }
 });

 //Find all products which name contains 'kw'
 app.get('/api/products?name=[kw]', async (req, res) => {
    try {
        const name = req.query.name;
        var condition = name ? { name: { [Op.like]: `${kw}$`}} : null;
        
        Product.findAll({where: condition})
        then(data => {
            res.send(data);
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })


mongoose.
connect("mongodb+srv://jorevkenz14:comp229@cluster0.esph80w.mongodb.net/NOVOMarketplace?retryWrites=true&w=majority")
.then(() => {
    console.log("connected to MongoDB")
    app.listen(5000, ()=> {
        console.log(`Node API app is running on port 5000`)
    });

}).catch((error) => {
    console.log(error)
})