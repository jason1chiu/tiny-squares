const { Schema, model } = require("mongoose");

const journalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  entries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Entry",
    },
  ],
  legends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Legend",
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const Journal = model("Journal", journalSchema);

module.exports = { Journal, journalSchema };
