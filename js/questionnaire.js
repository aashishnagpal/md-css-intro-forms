/**
 * Created by Aashish on 12/26/2016.
 */

(function () {
  'use strict';
  var txtInput = document.getElementById('text-other');
  Array.prototype.forEach.call(document.getElementsByName('fav-person'), function (element) {
    element.addEventListener('click', function (event) {

      if (event.target.id === 'radio-other') {
        txtInput.setAttribute('required', '');
      } else {
        txtInput.removeAttribute('required');
      }
    });
  });

  txtInput.addEventListener('keyup', function() {
    if (!validator.isAlphanumeric(txtInput.value.replace(/ /g, ''))) {
      txtInput.setCustomValidity('A person name can only contain alphanumeric characters.');
    } else {
      txtInput.setCustomValidity('');
    }
  });

  document.getElementById('submit').addEventListener('click', function (event) {
    document.getElementById('questionnaireForm').classList.add('validate');
  });
})();
