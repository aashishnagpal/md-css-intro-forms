/**
 * Created by Aashish on 12/29/2016.
 */

(function () {
  'use strict';
  var buildColor = function () {
    //This would return a NodeList for each color slider
    var colorInputs = document.querySelectorAll('input[type="range"]');

    // Create an array each for the rgba values and HEX values.
    var rgbaArr = [], hexArr = [];

    // We already know that the sliders in that order R,G,B,A
    // Use forEach
    Array.prototype.forEach.call(colorInputs, function (element, index) {
      var val = element.value, hexVal = (+val).toString(16);

      rgbaArr.push(val);
      if (index !== 3) {
        hexArr.push(hexVal.length === 1 ? ('0' + hexVal) : hexVal);
      }

      var txtBox = document.getElementById(element.id + '-val');
      if (txtBox.value !== val) txtBox.value = val;
    });

    // Assign Result
    var rgbaValue = 'rgba(' + rgbaArr.join(',') + ')';
    document.getElementById('builtColor').style.backgroundColor = rgbaValue;
    document.getElementById('rgba-value').innerHTML = 'RGBA: <strong>' + rgbaValue + '</strong>';
    document.getElementById('rgb-value').innerHTML = 'RGB Only: <strong>rgb(' + rgbaArr.slice(0,3).join(',') + ')</strong>';
    document.getElementById('hex-value').innerHTML = 'HEX: <strong>#' + hexArr.join('') + '</strong>';

  };

  var updateSlider = function (element) {
    if (element.value === '') {
      element.value = 0;
    }
    var sliderId = element.id.slice(0, -4);
    document.getElementById(sliderId).value = element.value;
    buildColor();
  };

  Array.prototype.forEach.call(document.querySelectorAll('input[type="range"]'), function (element) {
    element.addEventListener('change', buildColor);
  });

  Array.prototype.forEach.call(document.querySelectorAll('input[type="text"]'), function (element) {
    element.addEventListener('change', function () {
      updateSlider(element);
    });
    element.addEventListener('focus', function () {
      element.select();
    });
  });

  buildColor();
})();