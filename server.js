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
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  next();
});

app.use('/', require('./routes')); 

// Initialize DB before starting server
mongodb.initDb((err) => {
  if (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to MongoDB successfully");
    
    // Routes
    app.use('/', require('./routes'));
    
    // Start server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
});