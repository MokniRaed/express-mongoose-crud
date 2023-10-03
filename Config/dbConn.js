const mongoose = require("mongoose")

const dbConn = async ()=>{
    try {
        mongoose.connect(process.env.DB_URL)
        console.log("connected to DB");
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbConn