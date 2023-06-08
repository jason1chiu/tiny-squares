const { Schema, model } = require("mongoose");

const entrySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
  },
  legend: {
    type: Schema.Types.ObjectId,
    ref: "Legend",
    required: true,
  },
});

const Entry = model("Entry", entrySchema);

module.exports = { Entry, entrySchema };
