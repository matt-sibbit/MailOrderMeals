const Product = require("./models/productModel");
const Customer = require("./models/customerModel");
const Subscription = require("./models/subscriptionModel");
const bcrypt = require("bcrypt");

async function getAllProducts() {
    try {
        return await Product.find({});
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getProductById(id) {
    try {
        return await Product.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createProduct(productData) {
    try {
        return await Product.create(productData);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateProductById(id, updatedData) {
    try {
        const product = await Product.findByIdAndUpdate(id, updatedData);
        if (!product) {
            throw new Error(`Cannot find any product with ID ${id}`);
        }
        return await Product.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function registerCustomer(username, email, password) {
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer instance
        const newCustomer = new Customer({
            username,
            email,
            password: hashedPassword,
        });

        // Save the customer to the database
        await newCustomer.save();

        return newCustomer;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function loginCustomer(email, password) {
    try {
        const customer = await Customer.findOne({ email });

        if (!customer) {
            throw new Error("Cannot find user with that email");
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        return customer;
    } catch (error) {
        throw new Error(error.message);
    }
}

// async function getSubscriptionDetails(userId) {
//     try {
//         const subscriptions = await Subscription.find({ user: userId })
//             .populate({
//                 path: "meals.product",
//                 model: Product, 
//             })
//             .exec();

//         if (!subscriptions || subscriptions.length === 0) {
//             throw new Error("No subscriptions found for the user");
//         }

//         const subscriptionDetails = subscriptions.map((subscription) => ({
//             subscriptionId: subscription._id,
//             frequency: subscription.frequency,
//             deliveryAddress: subscription.deliveryAddress,
//             deliveryDay: subscription.deliveryDay,
//             meals: subscription.meals.map((meal) => ({
//                 productId: meal.product._id,
//                 productName: meal.product.name,
//                 size: meal.product.size,
//                 price: meal.product.price,
//             })),
//         }));

//         return subscriptionDetails;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

async function createSubscription(userEmail, subscriptionData) {
    try {
        const customer = await Customer.findOne({ email: userEmail });
        if (!customer) {
            throw new Error("Customer not found");
        }

        customer.subscription = subscriptionData;
        await customer.save();

        return customer;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    registerCustomer,
    loginCustomer,
    getSubscriptionDetails,
    createSubscription,
};