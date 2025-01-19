const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Fetch featured news
router.get('/featured', async (req, res) => {
  try {
    const featuredNews = await News.find({ isFeatured: true }).limit(5);
    res.json(featuredNews);
  } catch (error) {
    console.error('Error fetching featured news:', error);
    res.status(500).json({ error: 'Failed to fetch featured news' });
  }
});

// Fetch latest news
router.get('/latest', async (req, res) => {
  try {
    const latestNews = await News.find().sort({ dateTime: -1 }).limit(10); // Limit to 10 for efficiency
    res.json(latestNews);
  } catch (error) {
    console.error('Error fetching latest news:', error);
    res.status(500).json({ error: 'Failed to fetch latest news' });
  }
});

// Fetch news by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const news = await News.find({ category }).sort({ dateTime: -1 }); // Sort by dateTime for relevance
    res.json(news);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ error: 'Failed to fetch news by category' });
  }
});

// Fetch a specific news item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
    res.status(500).json({ message: 'Failed to fetch news item' });
  }
});

module.exports = router;
