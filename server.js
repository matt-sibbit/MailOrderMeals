const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:2830Password@mattcluster.5pix0hp.mongodb.net/MOM-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`MOM API is running on port 3000`);
    });
    console.log("connected to MondoDB");
  })
  .catch(() => {
    console.log(error);
  });

//routes

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello MOM API");
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
