// models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false }, // To differentiate featured and latest news
});

// Specify the collection name as 'buzzlynow'
module.exports = mongoose.model('News', newsSchema, 'buzzlynow');
