/**
 * Created by Aashish on 12/31/2016.
 */
(function () {
  'use strict';

  document.getElementById('scheduling-form').addEventListener('submit', function (event) {
    validator.errorUtilities.removeAllErrors('scheduling-form', 'errors-list');
    if (validator.errorUtilities.setAllErrors('scheduling-form', 'errors-list')) event.preventDefault();
  });

  var date = document.getElementById('date');
  var time = document.getElementById('time');
  var timezone = document.getElementById('timezone');

  date.setCustomValidity('Please select a valid date/time (future).');
  time.setCustomValidity('Please select a valid date/time (future).');
  timezone.setCustomValidity('Please select a valid time zone.');

  [date, time, timezone].forEach(function (element) {
    element.addEventListener('change', function () {
      var dateString = date.value + ' ' + time.value +
          ' GMT' + timezone.options[timezone.selectedIndex].getAttribute('data-zone-val');
      if (!validator.validations.isDate(dateString) || !validator.validations.isAfterToday(dateString)) {
        date.setCustomValidity('Please select a valid date/time (future).');
        time.setCustomValidity('Please select a valid date/time (future).');
        timezone.setCustomValidity('Please select a valid time zone.');

        if (!validator.validations.isEmpty(date.value) && !validator.validations.isEmpty(time.value)) {
          validator.errorUtilities.setElementError('errors-list', date.id);
          validator.errorUtilities.setElementError('errors-list', time.id);
          if (validator.validations.isEmpty(timezone.value))
            validator.errorUtilities.setElementError('errors-list', timezone.id);
        }
      } else {
        date.setCustomValidity('');
        time.setCustomValidity('');
        timezone.setCustomValidity('');

        validator.errorUtilities.removeElementError('errors-list', date.id);
        validator.errorUtilities.removeElementError('errors-list', time.id);
        validator.errorUtilities.removeElementError('errors-list', timezone.id);
      }
    });
  });


  var name = document.getElementById('name');
  name.setCustomValidity('Please mention a valid name (alphabets only).');
  name.addEventListener('change', function () {
    if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
      this.setCustomValidity('Please mention a valid name (alphabets only).');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var phone = document.getElementById('contact-number');
  phone.setCustomValidity('Please enter a valid phone number.');
  phone.addEventListener('change', function () {
    if (!validator.validations.isPhoneNumber(this.value)) {
      this.setCustomValidity('Please enter a valid phone number.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var email = document.getElementById('email');
  email.setCustomValidity('Please enter a valid email address.');
  email.addEventListener('change', function () {
    if (!validator.validations.isEmailAddress(this.value)) {
      this.setCustomValidity('Please enter a valid email address.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });

  var message = document.getElementById('message');
  message.setCustomValidity('Please fill out this field.');
  message.addEventListener('change', function () {
    if (validator.validations.isEmpty(this.value)) {
      this.setCustomValidity('Please fill out this field.');
    } else {
      this.setCustomValidity('');
    }
    validator.errorUtilities.setElementError('errors-list', this.id);
    validator.errorUtilities.removeElementError('errors-list', this.id);
  });
})();