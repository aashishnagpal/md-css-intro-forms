/**
 * Created by Aashish on 1/13/2017.
 */

(function () {
  'use strict';
  document.getElementById('payment-form').addEventListener('submit', function (event) {
    validator.errorUtilities.removeAllErrors('payment-form', 'errors-list');
    if (validator.errorUtilities.setAllErrors('payment-form', 'errors-list')) event.preventDefault();
  });

  var name = document.getElementById('name');
  name.setCustomValidity('Please fill out this field.');
  name.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
      this.setCustomValidity('Name should contain only alphabets.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var cardNumber = document.getElementById('card-number');
  cardNumber.setCustomValidity('Please enter a valid card number.');
  cardNumber.addEventListener('change', function () {
    console.log(this.validity);
    if (validator.validations.isEmpty(this.value) || !validator.validations.isCreditCard(this.value)) {
      this.setCustomValidity('Please enter a valid card number.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var cvv = document.getElementById('cvv');
  cvv.setCustomValidity('Please fill out this field.');
  cvv.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isNumericOnly(this.value.replace(/[\s-]/g, ''))) {
      this.setCustomValidity('CVV should only be numeric.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var month = document.getElementById('month');
  month.setCustomValidity('Please provide a valid email address.');
  month.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isValidDataListEntry(this)) {
      this.setCustomValidity('Please select a valid option.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var year = document.getElementById('year');
  year.setCustomValidity('Please fill out this field.');
  year.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else if (!validator.validations.isValidDataListEntry(this)) {
      this.setCustomValidity('Please select a valid option.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });
})();