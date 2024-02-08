const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/notesapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectDB = () => {
  mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  console.log("db connected..!");
};

module.exports = connectDB;
