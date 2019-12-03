var $ = function (id) { return document.getElementById(id); };

window.onload = function() {
    //image table
    displayImages();
    $("random").onclick = randomizeImages;
    
    //large image viewer
    displayLargeImage();
    $("leftb").onclick = imgLeft;
    $("rightb").onclick = imgRight;
};


//Array of product images
var imgArr = Array();
imgArr[0] = new Image();
imgArr[0].src = 'images/crowbar.png';

imgArr[1] = new Image();
imgArr[1].src = 'images/drill.png';

imgArr[2] = new Image();
imgArr[2].src = 'images/hammer.png';

imgArr[3] = new Image();
imgArr[3].src = 'images/pliers.png';

imgArr[4] = new Image();
imgArr[4].src = 'images/saw.png';

imgArr[5] = new Image();
imgArr[5].src = 'images/scissors.png';

imgArr[6] = new Image();
imgArr[6].src = 'images/screwdriver.png';

imgArr[7] = new Image();
imgArr[7].src = 'images/socketwrench.png';

imgArr[8] = new Image();
imgArr[8].src = 'images/wrench.png';


//prints out images in image table
function displayImages(){
    var imageString = "<tr>";

    for(i = 0; i < imgArr.length; i++){
        imageString += "<td><img src='" + imgArr[i].src + "'></td>";

        if(((i+1) % 3) == 0) imageString += "</tr><tr>"
    }
    imageString += "</tr>";

    $("image_table").innerHTML = imageString;
}

//Shuffles elements of an array a
function shuffleImages(a){
    var j, x, i;
    for(i = a.length - 1; i > 0; i--){
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

//shuffles and displays images
function randomizeImages(){
    shuffleImages(imgArr);
    displayImages();
}

var viewerIndex = 0;

//displays the large image
function displayLargeImage(){
    $("imgLarge").src = imgArr[viewerIndex].src;
}

function imgLeft(){
    if(viewerIndex >= 1) viewerIndex--;
    displayLargeImage();
}

function imgRight(){
    if(viewerIndex < imgArr.length - 1) 
        viewerIndex++;
    displayLargeImage();
}