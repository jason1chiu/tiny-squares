const { Schema } = require('mongoose');

// Import related schemas
const entrySchema = require('./Entry');
const legendSchema = require('./Legend');

const journalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  entries: [entrySchema],
  legends: [legendSchema],
  createdAt: Date,
  updatedAt: Date,
});

module.exports = journalSchema;