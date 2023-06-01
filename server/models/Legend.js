const { Schema } = require('mongoose');

const legendSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

module.exports = legendSchema;