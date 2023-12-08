const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Customer = require("./models/customerModel");
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    registerCustomer,
    loginCustomer,
    getSubscriptionDetails,
    createSubscription,
} = require("./queries");
const app = express();
const cors = require("cors");

app.use(cors({
    // origin: 'http://localhost:3000',
}));

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
        const product = await Product.findById(id);
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

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newCustomer = await registerCustomer(username, email, password);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await loginCustomer(email, password);
        res.status(200).json(customer);
    } catch (error) {
        // res.status(200).json({ ...customer.toObject(), userId: customer._id });
        res.status(401).json({ message: error.message });
    }
});

app.get("/customers/:email", async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.params.email });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/customers", async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a subscription
app.post("/subscriptions/:userId", async (req, res) => {
    try {
        // const userId = req.params.userId;
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const subscriptionData = req.body;
        const { product, frequency, deliveryAddress, deliveryDay } = req.body;
        if (!product || !frequency || !deliveryAddress || !deliveryDay) {
            return res.status(400).json({ message: "Missing required subscription fields" });
        }

        // Validate the request body (add your own validation logic)
        if (
            !subscriptionData.product ||
            !subscriptionData.frequency ||
            !subscriptionData.deliveryAddress ||
            !subscriptionData.deliveryDay
        ) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        const newSubscription = await createSubscription(userId, subscriptionData);

        res.status(201).json(newSubscription);
    } catch (error) {
        console.error(error.message);
        // res.status(500).json({ message: "Internal Server Error", error: error.message });
        res.status(500).json({ message: "Internal Server Error", errorDetails: error.toString() });
        // res.status(500).json({ message: "Internal Server Error" });
    }
});