const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Assuming there is a User model for subscribers
    required: true,
  },
  meals: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prouduct",
        required: true,
      },
    },
  ],
  frequency: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryDay: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    required: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
