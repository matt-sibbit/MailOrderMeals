const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Assuming there is a User model for subscribers
    required: true,
  },
  meals: [
    {
      meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
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
