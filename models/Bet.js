const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BetSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'MLB'
  },
  senderPick: {
    type: String
  },
  receiverPick: {
    type: String
  },
  amount: {
    type: Number
  },
  accepted: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bet = mongoose.model('Bet', BetSchema);
