// routes/news.js
const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Fetch featured news
router.get('/featured', async (req, res) => {
  try {
    const featuredNews = await News.find({ isFeatured: true }).limit(5);
    res.json(featuredNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch latest news
router.get('/latest', async (req, res) => {
  try {
    const latestNews = await News.find().sort({ dateTime: -1 }).limit(200000);
    res.json(latestNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/news/latest', async (req, res) => {
    try {
      const latestNews = await News.find({ category: 'latest' })
        .sort({ dateTime: -1 })
        .limit(3);
      res.json(latestNews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch latest news' });
    }
  });
  

// Route to get a specific news item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get news with optional category filter
router.get('/api/news', async (req, res) => {
    try {
      const { category } = req.query;
      const query = category ? { category: new RegExp(category, 'i') } : {};
      const news = await News.find(query);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching news data' });
    }
  });

module.exports = router;
