/**
 * Created by Aashish on 1/11/2017.
 */
(function () {
  'use strict';

  document.getElementById('login-form').addEventListener('submit', function (event) {
    validator.errorUtilities.removeAllErrors('login-form', 'errors-list');
    if (validator.errorUtilities.setAllErrors('login-form', 'errors-list')) event.preventDefault();
  });

  var username = document.getElementById('username');
  username.setCustomValidity('Please fill out this field.');
  username.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isAlphanumeric(this.value.replace(/ /g, ''))) {
      this.setCustomValidity('Please use a valid username (alphabets only).');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errorsList', this.id);
    validator.errorUtilities.removeElementError('errorsList', this.id);
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
    validator.errorUtilities.setElementError('errorsList', this.id);
    validator.errorUtilities.removeElementError('errorsList', this.id);
  });
})();