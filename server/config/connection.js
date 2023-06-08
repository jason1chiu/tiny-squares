// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tinysquares', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("Database Connected Successfully"))
// .catch(err => console.log(err));

// module.exports = mongoose.connection;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/your-database-name');

const mongoose = require("mongoose");

// Don't forget to replace `<password>` with your actual password
// const uri = "mongodb+srv://TinySquares:TinySquares54!@cluster0.lm5et7y.mongodb.net/tinysquares?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI || "mongodb+srv://TinySquares:TinySquares54!@cluster0.lm5et7y.mongodb.net/tinysquares?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

module.exports = mongoose.connection;