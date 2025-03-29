require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Initialize DB and start server
mongodb.initDb((err) => {
  if (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to MongoDB successfully");
    
    // Routes (moved outside initDb callback to avoid duplication)
    app.use(require('./routes')); // index.js routes
    app.use(require('./routes/contacts')); // contacts.js routes
    
    // Start server with Render-compatible settings
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});