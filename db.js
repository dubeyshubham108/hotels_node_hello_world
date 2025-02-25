const mongoose = require('mongoose');

// Define the mongoDB connection URL

const mongoURL = 'mongodb://localhost:27017/hotels' //

mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

// use define listeners for database connection

db.on('connected', () => {
    console.log("connected to mongodb server!");
})

db.on('error', () => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;