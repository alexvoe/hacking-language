var pictureList; //this variable is used in preload() and in draw() so we create it outside of those sections.

function preload() {
  pictureList = [];
  var imgCount = 7; //total number of images
  //use a for loop to load all 7 images into the array
  for (var i = 0; i < imgCount; i++) {
    pictureList[i] = loadImage((i + 1) + ".png");
  }
}


function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(0, 97, 255)
  //#0061FF
  
  var n = 45; //images

  for (var i = 0; i < n; i++) {
    
    var r = int(random(0, 7)); 
    var randomImage = pictureList[r] 
    
    var x = int(random(-100, 300));
    var y = int(random(-100, 300));
     
    image(randomImage, x, y, randomImage.width, randomImage.height);
    rotate(HALF_PI / 3.0);
  }

  
  
  //save("final-1.jpg"); //uncomment to save images; never use without the noLoop() in setup()

}

function mouseClicked() {
  redraw();
}