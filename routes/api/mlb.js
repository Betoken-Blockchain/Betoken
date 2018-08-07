const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load MLB model
const MLB = require('../../models/sportsFeed/MLB');

// @route   GET api/mlb/test
// @desc    Tests MLB route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'MLB Works' }));

// @route   GET api/mlb
// @desc    Get all MLB events
// @access  Public
router.get('/', (req, res) => {
  MLB.find()
    .sort({ date: 1 })
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noevents: 'No events found' }));
});

// @route   POST api/mlb
// @desc    Create MLB Event
// @access  Public
router.post('/', (req, res) => {
  // Get fields
  const eventFields = {};
  if (req.body.id) eventFields.id = req.body.id;
  if (req.body.scheduleStatus)
    eventFields.scheduleStatus = req.body.scheduleStatus;
  if (req.body.originalDate) eventFields.originalDate = req.body.originalDate;
  if (req.body.originalTime) eventFields.originalTime = req.body.originalTime;
  if (req.body.delayedOrPostponedReason)
    eventFields.delayedOrPostponedReason = req.body.delayedOrPostponedReason;
  if (req.body.date) eventFields.date = req.body.date;
  if (req.body.time) eventFields.time = req.body.time;
  if (req.body.location) eventFields.location = req.body.location;

  // Away Teams
  eventFields.awayTeam = {};
  if (req.body.awayTeam.City)
    eventFields.awayTeam.City = req.body.awayTeam.City;
  if (req.body.awayTeam.Name)
    eventFields.awayTeam.Name = req.body.awayTeam.Name;
  if (req.body.awayTeam.Abbreviation)
    eventFields.awayTeam.Abbreviation = req.body.awayTeam.Abbreviation;
  if (req.body.awayTeam.finalScore)
    eventFields.awayTeam.finalScore = req.body.awayTeam.finalScore;

  // Home Teams
  eventFields.homeTeam = {};
  if (req.body.homeTeam.City)
    eventFields.homeTeam.City = req.body.homeTeam.City;
  if (req.body.homeTeam.Name)
    eventFields.homeTeam.Name = req.body.homeTeam.Name;
  if (req.body.homeTeam.Abbreviation)
    eventFields.homeTeam.Abbreviation = req.body.homeTeam.Abbreviation;
  if (req.body.homeTeam.finalScore)
    eventFields.homeTeam.finalScore = req.body.homeTeam.finalScore;

  // Save Event
  new MLB(eventFields).save().then(event => res.json(event));
});

module.exports = router;
