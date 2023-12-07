const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customerID: {
        type: String,
        required: true,
    },
    productID: {
        type: String,
        required: true,
    },
  }
);