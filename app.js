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
var currentImages = [1, 2, 3]; // array to hold the three current images
var allImages = []; // array to hold all of the images in the catalog
var imageDOM = [
  document.getElementById('image-one'),
  document.getElementById('image-two'),
  document.getElementById('image-three')
];
// var imageOne = document.getElementById('image-one'); // list location to hold the first image
// var imageTwo = document.getElementById('image-two'); // list location to hold the first image
// var imageThree = document.getElementById('image-three'); // list location to hold the first image

// OBJECT CONSTRUCTOR


var Image = function (imageName, fileFormat) {
  this.name = imageName; // name describing the image
  this.filePath = './img/' + imageName + '.' + fileFormat; // the filepath to the image
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


// PROTOTYPE METHODS


//method: turn the image index array data into HTML img data
Image.prototype.convertToImgTag = function () { // create new method convertToImgTag, which:
  return '<img id="' + this.name + '" src="' + this.filePath + '" >' // returns the image as an img tag
} // end convertToImgTag method


// HELPER FUNCTIONS


// function: find a random number within a range
var randBetween = function (min, max) { // create new function randBetween, where:
  return Math.floor(Math.random() * (max - min) + min); // return a random number within the specified range
} // end randBetween function


// function: check if the input image number is unique to the past and current numbers
var isUnique = function (input) { // create new function isUnique, where:
  for (var i = 0; i < 3; i++) { // for every image that was displayed last iteration...
    if (input === previousImages[i]) { //|| // if the input isn't unique to the previous image, or
      //input === currentImages[i]) { // if the current input isn't unique to the other current images...
      console.log('unique input:',input);
      console.log('previous image:',previousImages[i]);
      console.log('current image:', currentImages[i]);
      console.log('unique: false')
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


// function: take an image index and return the proper image object
var imageAtIndex = function (index) { // create new function imageAtIndex, where:
  return allImages[index]; // the image object from the catalog corresponding to the index is returned
} // end imageAtIndex function


// function: take the values in the current image index array and turn them into HTML
var updateImageSet = function () { // create new function updateImageSet, where:
  for (var k = 0; k < 3; k++) { // for every image slot...
    imageDOM[k].innerHTML = '';
    imageDOM[k].innerHTML = imageAtIndex(currentImages[k]).convertToImgTag(); // input an image tag with the correct image object
  } // end for
} // end updateImageSet function


// function: says that all of the current items have been shown
var updateShown = function () { // create a new function, where:
  for (var l = 0; l < 3; l++) { // for every current image...
    imageAtIndex(currentImages[l]).timesShown++; // add an instance of being shown
  } // end for
} // end updateShown function


// EVENT LISTENER

for (var countdown = 25; countdown > 0; countdown --) {
  imageDOM[0].addEventListener('click', oneClicked); // if image is clicked, reset the images
  imageDOM[1].addEventListener('click', twoClicked); // if image is clicked, reset the images
  imageDOM[2].addEventListener('click', threeClicked); // if image is clicked, reset the images
}

// EVENT HANDLER


function oneClicked (event) {
  updateShown();
  imageAtIndex(currentImages[0]).timesClicked++;
  newImageSet();
  updateImageSet();
  console.log('countdown:',countdown);
  console.log('one:',currentImages[0]);
  console.log('two:',currentImages[1]);
  console.log('three:',currentImages[2]);
}


function twoClicked (event) {
  updateShown();
  imageAtIndex(currentImages[1]).timesClicked++;
  newImageSet(); // generate the next set of images
  updateImageSet();
}

function threeClicked (event) {
  updateShown();
  imageAtIndex(currentImages[2]).timesClicked++;
  newImageSet();
  updateImageSet();
}
