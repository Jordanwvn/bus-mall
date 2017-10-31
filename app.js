/*SKY BUS**********************************************************************
this is a script designed to make a program finds out which images from a
catalog the user is most interested in. Three images are shown, and the user
picks their favorite. Those three are then replaced with a new set. This process
is repeated 25 times, each time keeping track of which options were shown and
which were picked.
******************************************************************************/
'use strict';


/*****  VARIABLE DECLARATIONS *****/


var previousImages = [1, 2, 3]; // array to hold the three previous images
var currentImages = [4, 5, 6]; // array to hold the three current images
var allImages = []; // array to hold all of the images in the catalog
var imageDOM = [
  document.getElementById('left-image'), // first image
  document.getElementById('center-image'), // second image
  document.getElementById('right-image') // third image
];
var countdown = 25; // counter for how many times the process should run

var header = document.getElementById('table-header');
var body = document.getElementById('table-body');


/***** OBJECT CONSTRUCTOR *****/

// constructor: create an 'image', which is linked to a stored file
var Image = function (imageName, fileFormat) {
  this.name = imageName; // name describing the image
  this.filePath = './img/' + imageName + '.' + fileFormat; // the filepath to the image
  this.valid = true; // is the image viable to use currently? This begins as true
  this.timesShown = 0; // how many times this image was shown
  this.timesClicked = 0; // how many times this image was clicked
}


/***** OBJECT INSTANTIATION *****/


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


/***** PROTOTYPE METHODS *****/


//method: turn the image index array data into HTML img data
Image.prototype.convertToImgTag = function () { // create new method convertToImgTag, which:
  return '<img id="' + this.name + '" src="' + this.filePath + '" >' // returns the image as an img tag
} // end convertToImgTag method


/***** HELPER FUNCTIONS *****/


// function: find a random number within a range
var randomIndex = function () { // create new function randBetween, where:
  return Math.floor(Math.random() * allImages.length); // return a random number within the specified range
} // end randBetween function


// function: shift forwards with a totally new set of images
var updateImages = function () { // create function newImageSet, where:
  for (var j = 0; j < imageDOM.length; j++){ // for every current image index...
    imageAtIndex(previousImages[j]).valid = true; // the previous image being pushed is allowed to show again
    previousImages[j] = currentImages[j]; // change that image index to a 'previous image' index
    while (imageAtIndex(currentImages[j]).valid === false) { // while the currently picked image isn't allowed to show
      currentImages[j] = randomIndex(); // find a new random number
    }
    imageAtIndex(currentImages[j]).valid = false; // that image now isn't allowed to show again until told so
  } // end for loop
} // end newImageSet function


// function: take an image index and return the proper image object
var imageAtIndex = function (index) { // create new function imageAtIndex, where:
  return allImages[index]; // the image object from the catalog corresponding to the index is returned
} // end imageAtIndex function


// function: take the values in the current image index array and turn them into HTML
var updatePage = function () { // create new function updateImageSet, where:
  for (var k = 0; k < imageDOM.length; k++) { // for every image slot...
    imageDOM[k].innerHTML = ''; // clear the previous image
    imageDOM[k].innerHTML = imageAtIndex(currentImages[k]).convertToImgTag(); // input an image tag with the correct image object
  } // end for
} // end updateImageSet function


// function: says that all of the current items have been shown
var updateShown = function () { // create a new function, where:
  for (var l = 0; l < 3; l++) { // for every current image...
    imageAtIndex(currentImages[l]).timesShown++; // add an instance of being shown
    imageAtIndex(currentImages[l]).valid = false; // the image can no longer be shown again for two rounds
  } // end for
} // end updateShown function


// function: remove all the images from the end
var clearImages = function () { // create new function clearImages, where:
  imageDOM[0].removeEventListener('click', oneClicked); // the event listeners are removed
  imageDOM[1].removeEventListener('click', twoClicked); // ...
  imageDOM[2].removeEventListener('click', threeClicked); // ...
  for (var m = 0; m < imageDOM.length; m++) { // for every item in imageDOM...
    imageDOM[m].style.visibility = 'hidden'; // hide the image
  } // end for
} // end clearImages function


// function: make a table cell
var makeCell = function (input, parent, type) { // make function makeCell, where:
  var cell = document.createElement(type); // create the empty table element
  cell.innerHTML = input; // fill the cell with the input
  parent.appendChild(cell); // append the cell
} // end makeCell function


// function: find the percentage of clicks per views
var findPercentage = function (imageObject) { // create new function findPercentage, where:
  if(imageObject.timesShown === 0) { // if the image was never shown
    return '0%'; // return 0%
  } else { // otherwise
  var percent = Math.floor((imageObject.timesClicked / imageObject.timesShown) * 100) // divide the times clicked by the times seen, and multiply that product by 100
  return percent + '%'; // return that number with a percent sign
  } // end else
} // end findPercentage function


// function: create a table using the collected data
var makeTable = function () { // create a new function makeTable:

  // make the header of the table
  var headerRow = document.createElement('tr'); // create a header row
  makeCell('Image', header, 'th'); // make a title 'Image'
  makeCell('Times Seen', header, 'th'); // make a title cell 'Times Seen'
  makeCell('Times Clicked', header, 'th'); // make a title cell 'Times Clicked'
  makeCell('Clicks per Views', header, 'th'); // make a title cell 'Clicks per views'
  header.appendChild(headerRow); // apend the header row

  // make the body of the table
  for (var o = 0; o < allImages.length; o++) { // for every image
    var tableRow = document.createElement('tr'); // make a new table row
    makeCell(allImages[o].name, body, 'th'); // make a cell with the image name
    makeCell(allImages[o].timesShown, body, 'td'); // make a cell with the times shown
    makeCell(allImages[o].timesClicked, body, 'td'); // make a cell with the times clicked
    makeCell(findPercentage(allImages[o]), body, 'td'); // make a cell with the percentage clicked
    body.appendChild(tableRow); // apend the table row
  } // end for
} // end makeTable function


/***** START STATE *****/


// function: refresh the page by updating image information and then showing the current information
var refresh = function () { // create new function refresh, where:
  updateShown(); // update which images have been shown
  updateImages(); // update which images are queued to show
  updatePage(); // update which images are shown
} // end refresh function

refresh(); // bring out the first set of images


/***** EVENT LISTENERS *****/


imageDOM[0].addEventListener('click', oneClicked); // if image is clicked, reset the images
imageDOM[1].addEventListener('click', twoClicked); // if image is clicked, reset the images
imageDOM[2].addEventListener('click', threeClicked); // if image is clicked, reset the images


/***** EVENT HANDLERS *****/


// function: if the first image is clicked, move to the next step
function oneClicked (event) { // create new function oneClicked, where:
  if (countdown > 0) { // if there are still turns left in the countdown...
    imageAtIndex(currentImages[0]).timesClicked++; // add a click to the clicked image
    refresh(); // reset the page with new information
    countdown--; // count down on the countdown
  } else { // otherwise, if the countdown is finished
    clearImages(); // make the images invisible
    makeTable(); // make a table using the logged data
  } // end if else
} // end oneClicked function


// function: if the second image is clicked, move to the next step
function twoClicked (event) { // create new function oneClicked, where:
  if (countdown > 0) { // if there are still turns left in the countdown...
    imageAtIndex(currentImages[1]).timesClicked++; // add a click to the clicked image
    refresh(); // reset the page with new information
    countdown--; // count down on the countdown
  } else { // otherwise, if the countdown is finished
    clearImages(); // make the images invisible
    makeTable(); // make a table using the logged data
  } // end if else
} // end twoClicked function


// function: if the first image is clicked, move to the next step
function threeClicked (event) { // create new function oneClicked, where:
  if (countdown > 0) { // if there are still turns left in the countdown...
    imageAtIndex(currentImages[2]).timesClicked++; // add a click to the clicked image
    refresh(); // reset the page with new information
    countdown--; // count down on the countdown
  } else { // otherwise, if the countdown is finished
    clearImages(); // make the images invisible
    makeTable(); // make a table using the logged data
  } // end if else
} // end threeClicked function
