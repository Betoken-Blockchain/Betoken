const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MLBSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  scheduleStatus: {
    type: String
  },
  originalDate: {
    type: String
  },
  originalTime: {
    type: String
  },
  delayedOrPostponedReason: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  awayTeam: {
    ID: {
      type: String
    },
    City: {
      type: String
    },
    Name: {
      type: String
    },
    Abbreviation: {
      type: String
    },
    finalScore: {
      type: String
    }
  },
  homeTeam: {
    ID: {
      type: String
    },
    City: {
      type: String
    },
    Name: {
      type: String
    },
    Abbreviation: {
      type: String
    },
    finalScore: {
      type: String
    }
  },
  location: {
    type: String
  }
});

module.exports = MLB = mongoose.model('MLB', MLBSchema);
