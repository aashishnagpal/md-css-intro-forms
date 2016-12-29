/**
 * Created by Aashish on 12/5/2016.
 * File Name: validator.js
 * Purpose: This file will have all the validaton functions and sets the validator object onto window object.
 */

var validator = (function () {
  'use strict';
  var validator = {};

  validator.isEmailAddress = function (input) {
    // input should not be null, empty or length > 255
    if (!input || input.length > 255) return false;

    // at least and at most 1 '@' symbol should be there
    var atSymbolIndex = input.indexOf('@');
    if (atSymbolIndex < 1 || atSymbolIndex !== input.lastIndexOf('@') ||
        atSymbolIndex === input.length - 1) return false;

    // split local and domain parts using '@' symbol
    var localDomainSplit = input.split('@');
    var local = localDomainSplit[0], domain = localDomainSplit[1];

    // local or domain should not start or end with a period
    if (local.startsWith('.') || local.endsWith('.') ||
        domain.startsWith('.') || domain.endsWith('.')) return false;

    // local length should be <= 64
    // domain length maximum allowed is 255 characters but total max also is 255
    if (local.length > 64 || domain.length > (255 - local.length)) return false;

    // check if last label in domain has length at least 2
    if (domain.substr(domain.lastIndexOf('.')).length < 2) return false;

    return true;
  };

  validator.isPhoneNumber = function (input) {
    if (input) {
      input = input.split(' ').join('');
      if (input[0] === '(' && input[4] === ')') {
        input = input.replace('(', '').replace(')', '-');
      }

      if (input.indexOf('-') !== -1) {
        input = input.split('-').join('');
      } else if (input.indexOf('.') !== -1) {
        input = input.split('.').join('');
      }

      return (input.length === 10) && !isNaN(input);
    }
    return false;
  };

  var modifyPunctuations = function (input, symbols, action) {
    symbols = symbols || [];
    action = action || '';
    return (input !== null && typeof input !== 'undefined') && input.split('').map(function (character) {
          var code = character.charCodeAt(0);
          if ((code >= 65 && code <= 90) ||
              (code >= 97 && code <= 122) ||
              (code >= 48 && code <= 57)) return character;
          if (action === 'preserve' && symbols.includes(character)) return character;
          if (action === 'convert' && symbols.includes(character)) return ' ';
          return '';
        }).join('');
  };

  validator.withoutSymbols = function (input) {
    return modifyPunctuations(input, [' '], 'preserve');
  };

  validator.isDate = function (input) {
    return !isNaN(Date.parse(input));
  };


  validator.isBeforeDate = function (input, reference) {
    if (!validator.isDate(input)) throw 'validator function \'isBeforeDate\', missing parameter: \'input\'';
    if (!validator.isDate(reference)) throw 'validator function \'isBeforeDate\', missing parameter: \'reference\'';
    return Date.parse(input) < Date.parse(reference);
  };

  validator.isAfterDate = function (input, reference) {
    if (!validator.isDate(input)) throw 'validator function \'isAfterDate\', missing parameter: \'input\'';
    if (!validator.isDate(reference)) throw 'validator function \'isAfterDate\', missing parameter: \'reference\'';
    return Date.parse(input) > Date.parse(reference);
  };

  validator.isBeforeToday = function (input) {
    if (!validator.isDate(input)) throw 'validator function \'isBeforeToday\', missing parameter: \'input\'';
    return Date.parse(input) < Date.now();
  };

  validator.isAfterToday = function (input) {
    if (!validator.isDate(input)) throw 'validator function \'isAfterToday\', missing parameter: \'input\'';
    return Date.parse(input) > Date.now();
  };

  validator.isEmpty = function (input) {
    return input !== null && typeof input !== 'undefined' && !input.split(' ').join('').length;
  };

  validator.contains = function (input, words) {
    if (!input || !input.length) throw 'validator function \'contains\', missing or empty parameter: \'input\'';
    if (!words || !words.length) throw 'validator function \'contains\', missing or empty parameter: \'words\'';

    input = modifyPunctuations(input.toLowerCase(), [' ', '!', '"', '\'', ',', '-', '.', ':', ';', '?', '_'], 'convert').split(' ');
    words = words.map(function (word) {
      return input.includes(word.toLowerCase());
    });
    return (words).includes(true);
  };

  validator.lacks = function (input, words) {
    if (!input || !input.length) throw 'validator function \'lacks\', missing or empty parameter: \'input\'';
    if (!words || !words.length) throw 'validator function \'lacks\', missing or empty parameter: \'words\'';

    return !validator.contains(input, words);
  };

  validator.isComposedOf = function (input, strings) {
    if (!input || !input.length)
      throw 'validator function \'isComposedOf\', missing or empty parameter: \'input\'';
    if (!strings || !strings.length)
      throw 'validator function \'isComposedOf\', missing or empty parameter: \'strings\'';

    input = modifyPunctuations(input).toLowerCase(); //remove whitespaces
    var inputLength = input.length;

    // flags array to mark presence of matched characters/words
    var flags = Array.from(input, function () {
      return false;
    });
    strings.forEach(function(string) {
      string = modifyPunctuations(string).toLowerCase();
      var matcherLength = string.length;
      var loopLength = inputLength - matcherLength;
      for (var i = 0; i <= loopLength; i++) {
        if (input.substr(i, matcherLength) === string) {
          var loopLength2 = i + matcherLength;
          for (var j = i; j < loopLength2; j++) {
            if (!flags[j]) flags[j] = true;
          }
        }
      }
    });
    return !flags.includes(false);
  };

  // renamed from isLength as the name is more descriptive
  validator.isOfShorterOrEqualLength = function (input, n) {
    input = input || '';
    n = n || 0;
    return input.length <= n;
  };

  // renamed from isOfLength as the name is more descriptive
  validator.isOfEqualOrGreaterLength = function (input, n) {
    input = input || '';
    n = n || 0;
    return input.length >= n;
  };

  validator.countWords = function (input) {
    if (input === null || typeof input === 'undefined')
      throw 'validator function \'countWords\', missing parameter: \'input\'';

    input = modifyPunctuations(input.toLowerCase(), [' ', '!', '"', '\'', ',', '-', '.', ':', ';', '?', '_'], 'convert')
        .split(' ').filter(function (word) {
          return word.length;
        });

    return input.length;
  };

  // renamed from lessWordsThan as the name is more descriptive
  validator.hasLessWordsThan = function (input, n) {
    input = input || '';
    n = n || 0;
    return validator.countWords(input) <= n;
  };

  // renamed from moreWordsThan as the name is more descriptive
  validator.hasMoreWordsThan = function (input, n) {
    input = input || '';
    n = n || 0;
    return validator.countWords(input) >= n;
  };

  validator.isBetween = function (input, floor, ceil) {
    input = input || 0;
    floor = floor || 0;
    ceil = ceil || 0;
    return input >= floor && input <= ceil;
  };

  validator.isAlphanumeric = function (input) {
    input = input || '';
    return modifyPunctuations(input).length === input.length;
  };

  validator.isCreditCard = function (input) {
    if (!input || !input.length) return false;
    input = input.split('-').join('');
    return (input.length === 16) && !isNaN(input);
  };

  validator.isHex = function (input) {
    input = input || '';
    if (input.startsWith('#') && (input.length === 7 || input.length === 4)) {
      var value = input.substr(1).split('').map(function (character) {
        return parseInt(character, 16);
      });
      return !value.includes(NaN);
    }
    return false;
  };

  validator.isRGB = function (input) {
    input = input || '';
    var trimmed = input.split(' ').join('');
    if (trimmed.startsWith('rgb(') && trimmed.endsWith(')')) {
      var rgbValue = trimmed.slice(4, -1).split(',');
      if (rgbValue.length !== 3 || rgbValue.includes('')) return false;
      for (var i = 0; i < 3; i++) {
        if (rgbValue[i] === '' || rgbValue[i] < 0 || rgbValue[i] > 255) return false;
      }
      return true;
    }
    return false;
  };

  validator.isHSL = function (input) {
    input = input || '';
    var trimmed = input.split(' ').join('');
    if (trimmed.startsWith('hsl(') && trimmed.endsWith(')')) {
      var hslValue = trimmed.slice(4, -1).split(',');
      return !(
          hslValue.length !== 3 || hslValue.includes('') ||
          hslValue[0] < 0 || hslValue[0] > 360 ||
          hslValue[1] < 0 || hslValue[1] > 1 ||
          hslValue[2] < 0 || hslValue[2] > 1
      );
    }
    return false;
  };

  validator.isColor = function (input) {
    return validator.isHex(input) || validator.isRGB(input) || validator.isHSL(input);
  };

  validator.isTrimmed = function (input) {
    if (input === null || typeof input === 'undefined')
      throw 'validator function \'isTrimmed\', missing parameter: \'input\'';
    return input === '' || !input.split(' ').includes('');
  };

  return validator;
})();
