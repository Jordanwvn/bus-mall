'use strict';


// VARIABLE DECLARATIONS


var previousItems = [];
var currentItems = [];
var images = [];


// OBJECT CONSTRUCTORS


var Image = function (name, filePath, id) {
  this.name = name;
  this.filePath = filePath;
  this.id = document.getElementById(id);
  this.timesShown = 0;
  this.timesClicked = 0;
}


// HELPER FUNCTIONS


// function: find a random number within a range
var randBetween = function (min, max) {
  return Math.random() * (max - min) + min;
} // end randBetween function

// function: check if the input number is unique to the past and current numbers
var isUnique = function (input) {
  for (var i = 0; i < previousItems.length; i++) { // for every item that was displayed...
    if (input === previousItems[i] || input === currentItems[i]){ // if the input isn't unique
      return false; // return that the number is not unique
    } // end if
  } // end for
  return true; // if the number passes all testing, return that the number is unique
} // end compareItems function

// function: if the number isn't already unique, make sure it is
var makeUnique = function (input) {
  while (isUnique(input) === false) { // while the number is not unique
    input = randBetween(0, images.length); // find a unique random number
  } // end while
} // end makeUnique function
