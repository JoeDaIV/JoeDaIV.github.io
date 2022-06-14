// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function () {
    const $display = $('#display');

    // Multiple TODOs: Call your apply function(s) here
    //  applyFilter(reddify);
    applyFilterNoBackground(reddify);




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var r = 0; r < image.length; r++) {
        var row = image[r];
        for (var c = 0; c < row.length; c++) {
            var value = image[r][c]; // storing the image array in a variable
            var rgbString = value; // storing that variable in another variable to use 
            var rgbNumbers = rgbStringToArray(rgbString); // making a new array and saving it in rgbNumbers
            filterFunction(rgbNumbers); // changing/filtering the red collor in the image
            rgbString = rgbArrayToString(rgbNumbers); // assigning a new array back to rgbString
            image[r][c] = rgbString;
        }
    }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    var backgroundColor = image[0][0]; // gets the background color
    for (var r = 0; r < image.length; r++) {
        var row = image[r];
        for (var c = 0; c < row.length; c++) {
            var value = image[r][c];
            var rgbString = value; // storing that variable in another variable to use 
            if (backgroundColor !== value) { // makes it so we do not change the background color
                var rgbNumbers = rgbStringToArray(rgbString); // making a new array and saving it in rgbNumbers
                filterFunction(rgbNumbers); // changing/filtering the red collor in the image
                rgbString = rgbArrayToString(rgbNumbers); // assigning a new array back to rgbString
                image[r][c] = rgbString;
            }
        }
    }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(a) { // creating a range/boudary for my colors
    var low = Math.max(a, 0);
    var high = Math.min(low, 255);
    return high;
}

// TODO 3: Create reddify function
function reddify(rArr) { // changing red's color
    rArr[RED] = 200;

}

// TODO 6: Create more filter functions
function decreaseBlue(dbArr) { // more filters to change mario's color
    dbArr[BLUE] = keepInBounds(dbArr[BLUE] - 50);
}
function increaseGreenByBlue(gArr) {
    gArr[GREEN] = keepInBounds(gArr[GREEN] + gArr[BLUE]);
}

// CHALLENGE code goes below here



