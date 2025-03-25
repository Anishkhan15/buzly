const mongoose = require('mongoose');
const slugify = require('slugify');

// Define the news schema
const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 200 // Optional: Limit title length
  },
  slug: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Technology', 'Business', 'Health', 'Sports', 'Entertainment', 'Politics', 'Auto'], // Restrict categories
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
  }
});

// ✅ **Slug Auto-Generation Before Saving**
newsSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// ✅ **Indexes for Optimization**
newsSchema.index({ language: 1, category: 1 });
newsSchema.index({ isFeatured: 1 });
newsSchema.index({ language: 1, slug: 1 }, { unique: true }); // Unique slug per language

// ✅ **Dynamic Collection Selection (Fixing getCollectionName)**
function getCollectionName(language) {
  return language === 'hi' ? 'buzzlynowhi' : 'buzzlynow';
}

module.exports = mongoose.model('News', newsSchema, getCollectionName);
