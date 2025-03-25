require('dotenv').config();
const mongoose = require('mongoose');
const slugify = require('slugify');

// Define schemas for both collections
const NewsSchema = new mongoose.Schema({
  title: String,
  slug: String,
});

const EnglishNews = mongoose.model('EnglishNews', NewsSchema, 'buzzlynow');
const HindiNews = mongoose.model('HindiNews', NewsSchema, 'buzzlynowhi');

const mongoURI = process.env.MONGODB_URI;

async function addSlugsToNews(collection, name) {
  try {
    const articles = await collection.find();

    for (let news of articles) {
      if (!news.slug) {
        const generatedSlug = slugify(news.title, { lower: true, strict: true });

        await collection.updateOne(
          { _id: news._id },
          { $set: { slug: generatedSlug } }
        );

        console.log(`✅ Updated [${name}]: ${news.title} -> ${generatedSlug}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error updating slugs for ${name}:`, error);
  }
}

async function generateSlugs() {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");

    await addSlugsToNews(EnglishNews, 'English News');
    await addSlugsToNews(HindiNews, 'Hindi News');

    console.log('✅ Slug generation completed!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
}

generateSlugs();
