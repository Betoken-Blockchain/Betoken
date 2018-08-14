const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBetInput(data) {
  let errors = {};

  data.receiver = !isEmpty(data.receiver) ? data.receiver : '';
  data.senderPick = !isEmpty(data.senderPick) ? data.senderPick : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';

  if (Validator.isEmpty(data.receiver)) {
    errors.receiver = 'Please pick someone';
  }

  if (Validator.isEmpty(data.senderPick)) {
    errors.senderPick = 'Please pick a team';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Must choose an amount';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
