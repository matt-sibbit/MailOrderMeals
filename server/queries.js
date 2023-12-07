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

async function loginCustomer(username, password) {
  try {
    // Find the customer by username
    const customer = await Customer.findOne({ username });

    if (!customer) {
      throw new Error("Invalid username or password");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    return customer;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOrderDetails(customerId) {
  try {
    // Find the customer's subscriptions
    const subscriptions = await Subscription.find({ user: customerId });

    if (!subscriptions || subscriptions.length === 0) {
      throw new Error("No subscriptions found for the customer");
    }

    // You can customize the order details based on your schema and business logic
    const orderDetails = subscriptions.map((subscription) => ({
      subscriptionId: subscription._id,
      deliveryAddress: subscription.deliveryAddress,
      deliveryDay: subscription.deliveryDay,
      meals: subscription.meals.map((meal) => ({
        mealId: meal._id,
        name: meal.name,
        description: meal.description,
        price: meal.price,
        quantity: meal.quantity,
      })),
    }));

    return orderDetails;
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
  getOrderDetails,
};
