const express = require('express');
const CodeSnippet = require('../models/CodeSnippet');
const User = require('../models/User');

const router = express.Router();

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const user = await User.findOne({ sessionToken: token });
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

router.post('/save', auth, async (req, res) => {
  try {
    const { title, code, language } = req.body;

    const snippet = new CodeSnippet({
      userId: req.userId,
      title,
      code,
      language: language || 'c',
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const snippets = await CodeSnippet.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOne({ _id: req.params.id, userId: req.userId });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, code, language } = req.body;
    const snippet = await CodeSnippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, code, language },
      { new: true }
    );
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json({ message: 'Snippet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;