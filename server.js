const express = require("express");
const mongoose = require("mongoose");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
} = require("./queries");
const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:2830Password@mattcluster.5pix0hp.mongodb.net/MOM-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`MOM API is running on port 3000`);
    });
    console.log("connected to MongoDB");
  })
  .catch(() => {
    console.log(error);
  });

// routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello MOM API");
});

// EXAMPLE GET ALL DATA FROM DATABASE
app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET DATA BY ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE PRODUCT ENTRY INTO DATABASE
app.post("/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PRODUCT BY ID
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProductById(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
