/**
 * Created by Aashish on 1/13/2017.
 */
(function () {
  'use strict'
  document.getElementById('shipping-billing-form').addEventListener('submit', function (event) {
    console.log('submit event fired');
    validator.errorUtilities.removeAllErrors('shipping-billing-form', 'errors-list');
    if (validator.errorUtilities.setAllErrors('shipping-billing-form', 'errors-list')) event.preventDefault();
  });

  var billingName = document.getElementById('billing-name');
  var shippingName = document.getElementById('shipping-name');

  [billingName, shippingName].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
        this.setCustomValidity('Name should contain only alphabets.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });

  var billingAddressLine1 = document.getElementById('billing-address-1');
  var shippingAddressLine1 = document.getElementById('shipping-address-1');

  [billingAddressLine1, shippingAddressLine1].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });

  var billingAddressLine2 = document.getElementById('billing-address-2');
  var shippingAddressLine2 = document.getElementById('shipping-address-2');

  [billingAddressLine2, shippingAddressLine2].forEach(function (element) {
    element.addEventListener('change', function () {
      this.defaultValue = this.value;
    });
  });

  var billingCity = document.getElementById('billing-city');
  var shippingCity = document.getElementById('shipping-city');

  [billingCity, shippingCity].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
        this.setCustomValidity('City should contain only alphabets.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });

  var billingState = document.getElementById('billing-state');
  var shippingState = document.getElementById('shipping-state');

  [billingState, shippingState].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else if (!validator.validations.isAlphaOnly(this.value.replace(/ /g, ''))) {
        this.setCustomValidity('State should contain only alphabets.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });


  var billingZip = document.getElementById('billing-zipcode');
  var shippingZip = document.getElementById('shipping-zipcode');

  [billingZip, shippingZip].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else if (!validator.validations.isAlphanumeric(this.value.replace(/ /g, ''))) {
        this.setCustomValidity('Zip code should contain only alphabets or numbers.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });

  var billingCountry = document.getElementById('billing-country');
  var shippingCountry = document.getElementById('shipping-country');

  [billingCountry, shippingCountry].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else if (!validator.validations.isValidDataListEntry(this)) {
        this.setCustomValidity('Please select a valid country.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });

  var billingPhone = document.getElementById('billing-phone');
  var shippingPhone = document.getElementById('shipping-phone');

  [billingPhone, shippingPhone].forEach(function (element) {
    element.setCustomValidity('Please fill out this field.');
    element.addEventListener('change', function () {
      if (validator.validations.isEmpty(this.value)) {
        this.setCustomValidity('Please fill out this field.');
      } else if (!validator.validations.isPhoneNumber(this.value)) {
        this.setCustomValidity('Please enter a valid phone number.');
      } else {
        this.setCustomValidity('');
        this.defaultValue = this.value;
      }
      validator.errorUtilities.setElementError('errors-list', this.id);
      validator.errorUtilities.removeElementError('errors-list', this.id);
    });
  });

  var submitButton = document.getElementById('submit');
  var shippingSameAsBillingCheckbox = document.getElementById('same-as-billing');

  var shippingElements = [
    shippingName,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    shippingPhone
  ];

  var billingElements = [
    billingName,
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingState,
    billingZip,
    billingCountry,
    billingPhone
  ];

  shippingSameAsBillingCheckbox.addEventListener('click', function () {
    if (shippingSameAsBillingCheckbox.checked) {
      shippingElements.forEach(function (element, index) {
        element.value = billingElements[index].value;
        element.setAttribute('disabled', '');
        if (element.value && index !== 2) //index = 2 corresponds to Address Line 2 which is optional
          element.setCustomValidity('');
      });
    } else {
      shippingElements.forEach(function (element, index) {
        element.value = element.defaultValue;
        element.removeAttribute('disabled');
        if (!element.value && index !== 2) //index = 2 corresponds to Address Line 2 which is optional
          element.setCustomValidity('Please fill out this field.');
      });

    }
  });

  submitButton.addEventListener('click', function () {
    if (shippingSameAsBillingCheckbox.checked) {
      shippingElements.forEach(function (element, index) {
        element.value = billingElements[index].value;
        element.setAttribute('disabled', '');
        if (element.value && index !== 2) //index = 2 corresponds to Address Line 2 which is optional
          element.setCustomValidity('');
      });
    }
  })
})();