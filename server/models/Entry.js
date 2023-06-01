const { Schema } = require('mongoose');

const entrySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

module.exports = entrySchema;