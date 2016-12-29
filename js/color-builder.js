/**
 * Created by Aashish on 12/29/2016.
 */

(function () {
  'use strict';
  var buildColor = function () {
    //This would return a NodeList for each color slider
    var colorInputs = document.querySelectorAll('input[type="range"]');

    // Create an array each for the rgba values, inverted values (for text color), and HEX values.
    var rgbaArr = [], invertedArr = [], hexArr = [];

    // We already know that the sliders in that order R,G,B,A
    // Use forEach
    colorInputs.forEach(function (element, index) {
      var val = element.value, hexVal = (+val).toString(16);

      rgbaArr.push(val);
      if (index !== 3) {
        invertedArr.push(255 - val);
        hexArr.push(hexVal.length === 1 ? ('0' + hexVal) : hexVal);
      }

      var txtBox = document.getElementById(element.id + '-val');
      if (txtBox.value !== val) txtBox.value = val;
    });

    // Create rgbaValue, invertedValue and hexValue using array.join
    var rgbaValue = 'rgba(' + rgbaArr.join(',') + ')';
    var invertedValue = 'rgb(' + invertedArr.join(',') + ')';
    var hexValue = '#' + hexArr.join('');

    // Get hold of the textarea
    var colorArea = document.getElementById('builtColor');

    // Assign Color
    colorArea.style.backgroundColor = rgbaValue;
    colorArea.style.color = invertedValue;
    colorArea.innerHTML = '\n' + rgbaValue + '\n' + hexValue;
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