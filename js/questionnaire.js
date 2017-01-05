/**
 * Created by Aashish on 12/26/2016.
 */

(function () {
  'use strict';
  var options = document.getElementsByName('fav-person');
  var txtInput = document.getElementById('text-other');
  var errorElement = document.getElementById('error');

  Array.prototype.forEach.call(options, function (element) {
    element.addEventListener('click', function (event) {
      errorElement.innerHTML = '';
      errorElement.classList.remove('filled');
      if (event.target.id === 'radio-other') {
        txtInput.setAttribute('required', '');
      } else {
        txtInput.removeAttribute('required');
      }
    });
  });

  txtInput.addEventListener('keyup', function () {
    if (errorElement.innerHTML) {
      errorElement.innerHTML = '';
      errorElement.classList.remove('filled');
    }

    if (!validator.validations.isAlphanumeric(txtInput.value.replace(/ /g, ''))) {
      txtInput.setCustomValidity('A name can only contain alphanumeric characters.');
    } else {
      txtInput.setCustomValidity('');
    }
  });

  document.getElementById('submit').addEventListener('click', function (event) {
    document.getElementById('questionnaireForm').classList.add('validate');

    var validationMessage = '';
    Array.prototype.forEach.call(options, function (element) {
      if (element.validity.valueMissing) {
        validationMessage = 'Options: ' + element.validationMessage;
      }
    });
    if (validationMessage) {
      errorElement.innerHTML += validationMessage;
      errorElement.classList.add('filled');
    } else {
      errorElement.innerHTML += '';
    }

    if (document.getElementById('radio-other').checked &&
        (txtInput.validity.valueMissing || txtInput.validationMessage)) {
      errorElement.innerHTML += 'Text Box: ' + txtInput.validationMessage;
      errorElement.classList.add('filled');
    } else {
      errorElement.innerHTML += '';
    }

    if (errorElement.innerHTML) {
      event.preventDefault();
    }
  });
})();
