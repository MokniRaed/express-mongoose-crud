// Import the mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Define a schema for the "persons" collection in MongoDB
const personSchema = mongoose.Schema({
    // Define a field "name" of type String, which is required and has a default value of "name"
    name: {
        type: String,
        required: true,
        default: "name"
    },
    // Define a field "age" of type Number
    age: Number,
    // Define a field "favfood" as an array of Strings
    favfood: [String]
});

// Create and export a mongoose model named "persons" using the defined schema
module.exports = mongoose.model('persons', personSchema);
