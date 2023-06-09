const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb+srv://jasonchiu2:KRfUPZGqroIQD4F5@cluster0.cily4s1.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

module.exports = mongoose.connection;