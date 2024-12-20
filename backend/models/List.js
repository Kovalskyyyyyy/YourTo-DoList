const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  isEditing: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('List', ListSchema);