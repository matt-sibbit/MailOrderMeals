const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a customer name"],
  },

  frequency: {
    type: Number,
    required: [
      true,
      "Please enter how many times a month you would like a box",
    ],
  },
});
