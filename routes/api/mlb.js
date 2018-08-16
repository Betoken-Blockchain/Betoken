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

// @route   GET api/mlb/:id
// @desc    Get MLB event by event id
// @access  Public
router.get('/:id', (req, res) => {
  MLB.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err =>
      res.status(404).json({ noeventfound: 'No event with this id found' })
    );
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

// @route   POST api/mlb
// @desc    Create MLB Events
// @access  Public
router.post('/list', (req, res) => {
  // Map through list
  let list = req.body;
  list.map(event => {
    // Get fields
    const eventFields = {};
    if (event.id) eventFields.id = event.id;
    if (event.scheduleStatus) eventFields.scheduleStatus = event.scheduleStatus;
    if (event.originalDate) eventFields.originalDate = event.originalDate;
    if (event.originalTime) eventFields.originalTime = event.originalTime;
    if (event.delayedOrPostponedReason)
      eventFields.delayedOrPostponedReason = event.delayedOrPostponedReason;
    if (event.date) eventFields.date = event.date;
    if (event.time) eventFields.time = event.time;
    if (event.location) eventFields.location = event.location;

    // Away Teams
    eventFields.awayTeam = {};
    if (event.awayTeam.City) eventFields.awayTeam.City = event.awayTeam.City;
    if (event.awayTeam.Name) eventFields.awayTeam.Name = event.awayTeam.Name;
    if (event.awayTeam.Abbreviation)
      eventFields.awayTeam.Abbreviation = event.awayTeam.Abbreviation;
    if (event.awayTeam.finalScore)
      eventFields.awayTeam.finalScore = event.awayTeam.finalScore;

    // Home Teams
    eventFields.homeTeam = {};
    if (event.homeTeam.City) eventFields.homeTeam.City = event.homeTeam.City;
    if (event.homeTeam.Name) eventFields.homeTeam.Name = event.homeTeam.Name;
    if (event.homeTeam.Abbreviation)
      eventFields.homeTeam.Abbreviation = event.homeTeam.Abbreviation;
    if (event.homeTeam.finalScore)
      eventFields.homeTeam.finalScore = event.homeTeam.finalScore;

    // Save Event
    new MLB(eventFields).save().then(event => res.json(event));
  });
});

module.exports = router;
