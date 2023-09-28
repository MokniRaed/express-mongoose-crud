const mongoose = require("mongoose")

const dbConn = async ()=>{
    try {
        mongoose.connect("mongodb+srv://raed:raed@cluster0.dlv9nnr.mongodb.net/personDb")
        console.log("connected to DB");
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbConn