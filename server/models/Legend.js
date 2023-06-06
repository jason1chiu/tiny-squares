const { Schema, model } = require("mongoose");

const legendSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Legend = model("Legend", legendSchema);

module.exports = { Legend, legendSchema };
