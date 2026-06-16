require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Event = require('./models/Event');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/drowsiness_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Endpoint to log a new drowsiness event
app.post('/api/events', async (req, res) => {
  try {
    const { eventType, severity, details } = req.body;
    const newEvent = new Event({
      eventType: eventType || 'drowsiness_detected',
      severity: severity || 'high',
      details: details || {}
    });
    const savedEvent = await newEvent.save();
    console.log('Event logged:', savedEvent);
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    console.error('Error logging event:', error);
    res.status(500).json({ success: false, error: 'Failed to log event' });
  }
});

// API Endpoint to get all drowsiness events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
