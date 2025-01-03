const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crud_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB connection error: ${error}`);
});

module.exports = mongoose;