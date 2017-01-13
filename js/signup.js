/**
 * Created by Aashish on 1/11/2017.
 */
(function () {
  'use strict';
  document.getElementById('signup-form').addEventListener('submit', function (event) {
    validator.errorUtilities.removeAllErrors('signup-form', 'errors-list');
    if (validator.errorUtilities.setAllErrors('signup-form', 'errors-list')) event.preventDefault();
  });

  var firstName = document.getElementById('first-name');
  firstName.setCustomValidity('Please fill out this field.');
  firstName.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
      this.setCustomValidity('First name should contain only alphabets.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var lastName = document.getElementById('last-name');
  lastName.setCustomValidity('Please fill out this field.');
  lastName.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
      this.setCustomValidity('Last name should contain only alphabets.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var email = document.getElementById('email');
  email.setCustomValidity('Please provide a valid email address.');
  email.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value) || !validator.validations.isEmailAddress(this.value)) {
      this.setCustomValidity('Please provide a valid email address.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var confirmEmail = document.getElementById('confirm-email');
  confirmEmail.setCustomValidity('Please provide a valid email address.');
  confirmEmail.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please provide a valid email address.');
      validator.errorUtilities.setElementError('errors-list', this.id);
    } else {
      this.setCustomValidity('');
      validator.errorUtilities.removeElementError('errors-list', this.id);
      console.log('removed');
    }

    if (this.value !== email.value) {
      this.setCustomValidity('Email fields do not match.');
      validator.errorUtilities.setElementError('errors-list', this.id);
    } else {
      this.setCustomValidity('');
      validator.errorUtilities.removeElementError('errors-list', this.id);
    }


  });

  var password = document.getElementById('password');
  password.setCustomValidity('Please fill out this field.');
  password.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isOfEqualOrGreaterLength(this.value, 8)) {
      this.setCustomValidity('Password should be at least 8 characters.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var confirmPassword = document.getElementById('confirm-password');
  confirmPassword.setCustomValidity('Please fill out this field.');
  confirmPassword.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
      validator.errorUtilities.setElementError('errors-list', this.id);
    } else {
      this.setCustomValidity('');
      validator.errorUtilities.removeElementError('errors-list', this.id);
    }

    if (this.value !== password.value) {
      this.setCustomValidity('Password fields do not match.');
      validator.errorUtilities.setElementError('errors-list', this.id);
    } else {
      this.setCustomValidity('');
      validator.errorUtilities.removeElementError('errors-list', this.id);
    }


  });

  var date = document.getElementById('dob');
  date.setCustomValidity('Please select a valid date.');

  date.addEventListener('change', function () {
    if (!validator.validations.isDate(this.value) || !validator.validations.isBeforeToday(this.value)) {
      this.setCustomValidity('Please select a valid date.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var termsAndConditions = document.getElementById('agreement');
  termsAndConditions.setCustomValidity('Please agree to the Terms and Conditions.');
  termsAndConditions.addEventListener('change', function() {
    if (!this.checked) {
      this.setCustomValidity('Please agree to the Terms and Conditions.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });
})();