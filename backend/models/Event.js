const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    default: 'drowsiness_detected'
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'high'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  details: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('Event', EventSchema);
