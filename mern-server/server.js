const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// MongoDB connection setup
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to the MongoDB database
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Export the connectDB and client for use in other modules
module.exports = { connectDB, client };

// Middleware to handle CORS and parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes go here
const booksRoute = require('./routes/books');
app.use('/books', booksRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB when the server starts
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
  client.close();
  console.log('Disconnected from MongoDB');
  process.exit();
});
