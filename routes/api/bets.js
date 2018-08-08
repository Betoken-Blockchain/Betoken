const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Bet Model
const Bet = require('../../models/Bet');
// Profile Model
const Profile = require('../../models/Profile');

// Validation
const validateBetInput = require('../../validation/bet');

// @route   GET api/bets/test
// @desc    Tests bets route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Bets Works' }));

// @route   GET api/bets
// @desc    GET Bet
// @access  Public
router.get('/', (req, res) => {
  Bet.find()
    .sort({ createdAt: -1 })
    .then(bets => res.json(bets))
    .catch(err => res.status(404)({ nobetsfound: 'No bets found' }));
});

// @route   GET api/bets/:id
// @desc    GET Bet by id
// @access  Public
router.get('/:id', (req, res) => {
  Bet.findById(req.params.id)
    .then(bets => res.json(bets))
    .catch(err =>
      res.status(404)({ nobetsfound: 'No bets found with that id' })
    );
});

// @route   POST api/bets
// @desc    Create Bet
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBetInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newBet = new Bet({
      sender: req.user.id,
      receiver: req.body.receiver,
      eventId: req.body.eventId,
      senderPick: req.body.senderPick,
      amount: req.body.amount
    });

    newBet.save().then(bet => res.json(bet));
  }
);

// @route   DELETE api/bets/:id
// @desc    DELETE bet
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Bet.findById(req.params.id)
        .then(bet => {
          // Check for bet owner
          if (bet.sender.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          bet.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ betnotfound: 'No bet found' }));
    });
  }
);

module.exports = router;
