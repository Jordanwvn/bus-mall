/*SKY BUS**********************************************************************
this is a script designed to make a program finds out which images from a
catalog the user is most interested in. Three images are shown, and the user
picks their favorite. Those three are then replaced with a new set. This process
is repeated 25 times, each time keeping track of which options were shown and
which were picked.
******************************************************************************/
'use strict';


// VARIABLE DECLARATIONS


var previousImages = [1, 2, 3]; // array to hold the three previous images
var currentImages = [4, 5, 6]; // array to hold the three current images
var allImages = []; // array to hold all of the images in the catalog
var imageDOM = [
  document.getElementById('image-one'), // first image
  document.getElementById('image-two'), // second image
  document.getElementById('image-three') // third image
];
var countdown = 25; // counter for how many times the process should run

var header = document.getElementById('table-header');
var body = document.getElementById('table-body');


// OBJECT CONSTRUCTOR


// constructor: create an 'image', which is linked to a stored file
var Image = function (imageName, fileFormat) {
  this.name = imageName; // name describing the image
  this.filePath = './img/' + imageName + '.' + fileFormat; // the filepath to the image
  this.valid = true; // is the image viable to use currently?
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
var randomIndex = function () { // create new function randBetween, where:
  // var max = allImages.length;
  // var min = 0;
  return Math.floor(Math.random() * allImages.length); // return a random number within the specified range
} // end randBetween function


// function: shift forwards with a totally new set of images
var updateImages = function () { // create function newImageSet, where:
  for (var j = 0; j < 3; j++){ // for every current image index...
    imageAtIndex(previousImages[j]).valid = true;
    console.log('previous:',imageAtIndex(previousImages[j]).name);
    console.log('previous:',imageAtIndex(previousImages[j]).valid);
    previousImages[j] = currentImages[j]; // change that image index to a 'previous image' index
    console.log('new previous:',imageAtIndex(previousImages[j]).name);
    console.log('new previous:',imageAtIndex(previousImages[j]).valid);
    while (imageAtIndex(currentImages[j]).valid === false) {
      currentImages[j] = randomIndex();
    }
    imageAtIndex(currentImages[j]).valid = false;
  } // end for loop
} // end newImageSet function


// function: take an image index and return the proper image object
var imageAtIndex = function (index) { // create new function imageAtIndex, where:
  return allImages[index]; // the image object from the catalog corresponding to the index is returned
} // end imageAtIndex function


// function: take the values in the current image index array and turn them into HTML
var updatePage = function () { // create new function updateImageSet, where:
  for (var k = 0; k < 3; k++) { // for every image slot...
    imageDOM[k].innerHTML = '';
    imageDOM[k].innerHTML = imageAtIndex(currentImages[k]).convertToImgTag(); // input an image tag with the correct image object
  } // end for
} // end updateImageSet function


// function: says that all of the current items have been shown
var updateShown = function () { // create a new function, where:
  for (var l = 0; l < 3; l++) { // for every current image...
    imageAtIndex(currentImages[l]).timesShown++; // add an instance of being shown
    imageAtIndex(currentImages[l]).valid = false;
  } // end for
} // end updateShown function


var clearImages = function () {
  imageDOM[0].removeEventListener('click', oneClicked);
  imageDOM[1].removeEventListener('click', twoClicked);
  imageDOM[2].removeEventListener('click', threeClicked);
  for (var m = 0; m < 3; m++) {
    imageDOM[m].style.visibility = 'hidden';
  }
}

var makeCell = function (input, parent, type) {
  var cell = document.createElement(type);
  cell.innerHTML = input;
  parent.appendChild(cell);
}


var findPercentage = function (imageObject) {
  if(imageObject.timesClicked === 0 && imageObject.timesShown === 0) {
    return '0%';
  } else {
  var percent = Math.floor((imageObject.timesClicked / imageObject.timesShown) * 100)
  return percent + '%';
  }
}


var makeTable = function () {
  var headerRow = document.createElement('tr');
  makeCell('Image', header, 'th');
  makeCell('Times Seen', header, 'th');
  makeCell('Times Clicked', header, 'th');
  makeCell('Clicks per Views', header, 'th');
  header.appendChild(headerRow);
  for (var o = 0; o < allImages.length; o++) {
    var tableRow = document.createElement('tr');
    var percentage = findPercentage(allImages[o]);
    makeCell(allImages[o].name, body, 'th');
    makeCell(allImages[o].timesShown, body, 'td');
    makeCell(allImages[o].timesClicked, body, 'td');
    makeCell(percentage, body, 'td');
    body.appendChild(tableRow);
  }
}

// START STATE


var refresh = function () {
  updateShown();
  updateImages();
  updatePage();
}

refresh();


// EVENT LISTENERS


imageDOM[0].addEventListener('click', oneClicked); // if image is clicked, reset the images
imageDOM[1].addEventListener('click', twoClicked); // if image is clicked, reset the images
imageDOM[2].addEventListener('click', threeClicked); // if image is clicked, reset the images


// EVENT HANDLERS


function oneClicked (event) {
  if (countdown > 0) {
    imageAtIndex(currentImages[0]).timesClicked++;

    refresh();
    countdown--;
  } else {
    clearImages();
    makeTable();
  }
}


function twoClicked (event) {
  if (countdown > 0) {
    imageAtIndex(currentImages[1]).timesClicked++;
    refresh();
    countdown--;
  } else {
    clearImages();
    makeTable();
  }
}

function threeClicked (event) {
  if (countdown > 0) {
    imageAtIndex(currentImages[2]).timesClicked++;
    refresh();
    countdown--;
  } else {
    clearImages();
    makeTable();
  }
}
