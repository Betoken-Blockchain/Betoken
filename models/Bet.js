const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BetSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  eventId: {
    type: String
  },
  senderPick: {
    type: String
  },
  amount: {
    type: Number
  },
  accept: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bet = mongoose.model('Bet', BetSchema);
