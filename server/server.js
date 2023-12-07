
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Customer = require("./models/customerModel");
const app = express();
const cors = require('cors');

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:2830Password@mattcluster.5pix0hp.mongodb.net/MOM-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log(`MOM API is running on port 4000`);
    });
    console.log("connected to MongoDB");
  })
  .catch(() => {
    console.log(error);
  });

//routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello MOM API");
});

//EXAMPLE GET DATA FROM DATABASE
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET DATA BY ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findbyID(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CREATE ENTRY INTO DATABASE
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `connot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findbyID(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});