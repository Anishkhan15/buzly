const mongoose = require('mongoose');

// Define the news schema
const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 200 // Optional: Limit the title length
  },
  image: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true,
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Technology', 'Business', 'Health', 'Sports', 'Entertainment', 'Politics','Auto'], // Optional: Restrict categories
  },
  dateTime: { 
    type: Date, 
    default: Date.now 
  },
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  language: { 
    type: String, 
    required: true, 
    enum: ['en', 'hi'] // Only English and Hindi allowed
  },
});

// Indexing for optimization (optional)
newsSchema.index({ language: 1, category: 1 });
newsSchema.index({ isFeatured: 1 });

// Function to dynamically choose the collection based on the language
newsSchema.statics.getCollectionName = function(language) {
  return language === 'hi' ? 'buzzlynowhi' : 'buzzlynow'; // Select collection based on language
};

// Create and export the model
module.exports = mongoose.model('News', newsSchema);
