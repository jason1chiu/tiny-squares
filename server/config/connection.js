const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/tinysquares"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

module.exports = mongoose.connection;