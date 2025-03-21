const express = require('express');
const mongoose = require('mongoose');
const News = require('../models/News');
const router = express.Router();

const getCollectionName = (lang) => (lang === 'hi' ? 'buzzlynowhi' : 'buzzlynow');
const getNewsModel = (collectionName) =>
  mongoose.models[collectionName] || mongoose.model('News', News.schema, collectionName);

// Fetch featured news
router.get('/featured/:lang', async (req, res) => {
  const { lang } = req.params;
  if (!['en', 'hi'].includes(lang)) {
    return res.status(400).json({ error: 'Invalid language parameter' });
  }
  try {
    const collectionName = getCollectionName(lang);
    const newsModel = getNewsModel(collectionName);
    const featuredNews = await newsModel.find({ isFeatured: true, language: lang }).limit(5);
    res.json(featuredNews);
  } catch (error) {
    console.error(`Error fetching featured news for language ${lang}:`, error);
    res.status(500).json({ error: 'Failed to fetch featured news' });
  }
});

// Fetch latest news
router.get('/latest/:lang', async (req, res) => {
  const { lang } = req.params;
  if (!['en', 'hi'].includes(lang)) {
    return res.status(400).json({ error: 'Invalid language parameter' });
  }
  try {
    const collectionName = getCollectionName(lang);
    const newsModel = getNewsModel(collectionName);
    const latestNews = await newsModel.find({ language: lang }).sort({ dateTime: -1 }).limit(90000000);
    res.json(latestNews);
  } catch (error) {
    console.error(`Error fetching latest news for language ${lang}:`, error);
    res.status(500).json({ error: 'Failed to fetch latest news' });
  }
});

// Fetch news by category
// Fetch news by category
router.get('/category/:lang/:category', async (req, res) => {
    const { lang, category } = req.params;
    if (!['en', 'hi'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language parameter' });
    }
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }
    try {
      const collectionName = getCollectionName(lang);
      const newsModel = getNewsModel(collectionName);
      const news = await newsModel.find({ category, language: lang }).sort({ dateTime: -1 });
      if (news.length === 0) {
        return res.status(404).json({ error: `No news found for category ${category} and language ${lang}` });
      }
      res.json(news);
    } catch (error) {
      console.error(`Error fetching news for category ${category} and language ${lang}:`, error);
      res.status(500).json({ error: 'Failed to fetch news by category' });
    }
  });
  

// Fetch news by ID
router.get('/:lang/:id', async (req, res) => {
  const { lang, id } = req.params;
  if (!['en', 'hi'].includes(lang)) {
    return res.status(400).json({ error: 'Invalid language parameter' });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid news ID' });
  }
  try {
    const collectionName = getCollectionName(lang);
    const newsModel = getNewsModel(collectionName);
    const newsItem = await newsModel.findById(id);
    if (!newsItem) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(newsItem);
  } catch (error) {
    console.error(`Error fetching news item for language ${lang} and ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
});




module.exports = router;
