// Import the mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Define a schema for the "persons" collection in MongoDB
const userSchema = mongoose.Schema({
  // Define a field "name" of type String, which is required and has a default value of "name"
  email: {
    type: String,
    required: true,
  },
  // Define a field "age" of type Number
  password: {
    type: String,
    required: true,
  },
  // Define a field "favfood" as an array of Strings
  name: {
    type: String,
    required: true,
  },
});

// Create and export a mongoose model named "persons" using the defined schema
module.exports = mongoose.model("users", userSchema);
