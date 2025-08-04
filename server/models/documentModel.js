const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    fileUrl: String,
    uploaded_by: String,
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('documents', documentSchema);

