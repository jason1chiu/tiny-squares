const { Schema, model } = require("mongoose");

// Import entrySchema
const { entrySchema } = require("./Entry");
const { legendSchema } = require("./Legend")

const journalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  entries: [ entrySchema ],
  legends: [ legendSchema ],
  createdAt: Date,
  updatedAt: Date,
});

const Journal = model("Journal", journalSchema);

module.exports = { Journal, journalSchema };