const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    // required: true,
  },
  size: {
    type: String,
    // required: true,
  },
  frequency: {
    type: Number,
    // required: true,
  },
  deliveryAddress: {
    type: String,
    // required: true,
  },
  deliveryDay: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    // required: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
