/*SKY BUS**********************************************************************
this is a script designed to make a program finds out which images from a
catalog the user is most interested in. Three images are shown, and the user
picks their favorite. Those three are then replaced with a new set. This process
is repeated 25 times, each time keeping track of which options were shown and
which were picked.
******************************************************************************/
'use strict';


// VARIABLE DECLARATIONS


var previousImages = []; // array to hold the three previous images
var currentImages = []; // array to hold the three current images
var allImages = []; // array to hold all of the images in the catalog


// OBJECT CONSTRUCTOR


var Image = function (imageName, fileFormat) {
  this.name = imageName; // name describing the image
  this.filePath = '/img/' + imageName + '.' + fileFormat; // the filepath to the image
  // this.id = document.getElementById(this.name); // the HTML class tag for this image
  this.timesShown = 0; // how many times this image was shown
  this.timesClicked = 0; // how many times this image was clicked
}


// OBJECT INSTANTIATION


allImages.push( // add images to the array of image objects:
  new Image('bag', 'jpg'), // allImages[0]
  new Image('banana', 'jpg'), // allImages[1]
  new Image('bathroom', 'jpg'), // allImages[2]
  new Image('boots', 'jpg'), // allImages[3]
  new Image('breakfast', 'jpg'), // allImages[4]
  new Image('bubblegum', 'jpg'), // allImages[5]
  new Image('chair', 'jpg'), // allImages[6]
  new Image('cthulhu', 'jpg'), // allImages[7]
  new Image('dog-duck', 'jpg'), // allImages[8]
  new Image('dragon', 'jpg'), // allImages[9]
  new Image('pen', 'jpg'), // allImages[10]
  new Image('pet-sweep', 'jpg'), // allImages[11]
  new Image('scissors', 'jpg'), // allImages[12]
  new Image('shark', 'jpg'), // allImages[13]
  new Image('sweep', 'png'), // allImages[14]
  new Image('tauntaun', 'jpg'), // allImages[15]
  new Image('unicorn', 'jpg'), // allImages[16]
  new Image('usb', 'gif'), // allImages [17]
  new Image('water-can', 'jpg'), // allImages [18]
  new Image('wine-glass', 'jpg') // allImages [19]
);


// HELPER FUNCTIONS


// function: find a random number within a range
var randBetween = function (min, max) { // create new function randBetween, where:
  return Math.random() * (max - min) + min; // return a random number within the specified range
} // end randBetween function


// function: check if the input image number is unique to the past and current numbers
var isUnique = function (input) { // create new function isUnique, where:
  for (var i = 0; i < previousImages.length; i++) { // for every image that was displayed last iteration...
    if (input === previousImages[i] || input === currentImages[i]){ // if the current input isn't unique to those...
      return false; // return that the number is not unique
    } // end if statement
  } // end for loop
  return true; // if the number passes all testing, return that the number is unique
} // end compareItems function


// function: if the number isn't already unique, make sure it is
var makeUnique = function (number) { // create new function makeUnique, where:
  while (isUnique(number) === false) { // as long as the input number is not unique
    number = randBetween(0, allImages.length - 1); // keep changing that number
  } // end while loop
} // end makeUnique function


// function: shift forwards with a totally new set of images
var newImageSet = function () { // create function newImageSet, where:
  for (var j = 0; j < 3; j++){ // for every current image index...
    previousImages[j] = currentImages[j]; // change that image index to a 'previous image' index
    currentImages[j] = randBetween(0, allImages.length - 1); // replace it with a new random image index
    makeUnique(currentImages[j]); // make sure that new image is unique to predecesors and partners
  } // end for loop
} // end newImageSet function


// EVENT LISTENER


choices.addEventListener('click', choiceMade); // if an image is clicked,


// EVENT HANDLER


function choiceMade (event) {
  event.target.
}
