const { Schema, model } = require("mongoose");

const journalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    legends: [{ type: Schema.Types.ObjectId, ref: "Legend" }],
    entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = model("Journal", journalSchema);

module.exports = { Journal, journalSchema };
