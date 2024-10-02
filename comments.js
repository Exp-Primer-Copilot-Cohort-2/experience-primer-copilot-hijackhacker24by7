// Create web server
const express = require('express');
const app = express();

// Use body-parser to parse POST request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use cors to allow cross-origin requests
const cors = require('cors');
app.use(cors());

// Import the 'comments' module
const comments = require('./comments.js');

// GET /comments
// Respond with all comments in the database
app.get('/comments', (req, res) => {
  res.json(comments.getAll());
});

// POST /comments
// Create a new comment
app.post('/comments', (req, res) => {
  const username = req.body.username;
  const comment = req.body.comment;

  if (username && comment) {
    const newComment = comments.create(username, comment);
    res.json(newComment);
  } else {
    res.status(400).json({ error: 'username and comment are required' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});