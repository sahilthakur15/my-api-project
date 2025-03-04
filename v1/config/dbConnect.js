const mongoose = require("mongoose");

const dbconnect = async () => {
    try{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB");
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = dbconnect; // exporting dbconnect function
