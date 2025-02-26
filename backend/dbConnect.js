const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/Quiz")
        .then(() => console.log("Connected to MongoDB!"))
        .catch((error) => console.error("MongoDB connection error:", error));
};

module.exports = dbConnect;