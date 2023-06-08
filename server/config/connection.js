const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tinysquares', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

module.exports = mongoose.connection;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/your-database-name');