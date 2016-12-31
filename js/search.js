/**
 * Created by Aashish on 12/30/2016.
 */
(function () {
  'use strict';
  var searchTerm = document.getElementById('search-term');
  var category = document.getElementById('category');

  category.addEventListener('change', function () {
    var selectionMatches = false;
    var options = this.list.options;

    for (var j = 0, optionsLen = options.length; j < optionsLen; j++) {
      if (this.value == options[j].value) {
        selectionMatches = true;
        break;
      }
    }

    if (selectionMatches) {
      this.setCustomValidity('');
    } else {
      this.setCustomValidity('Please select a valid value.');
    }
  });

  document.getElementById('submit').addEventListener('click', function (event) {
    document.getElementById('searchForm').classList.add('validate');
  });
})();