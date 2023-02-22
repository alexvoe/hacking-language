let counter = 0;
let row = 0;
let rowHeight = 20;

let xPos = 0;
let yPos = 0;
let xStep;
let yStep = xStep;

let offset = 0;

var text


// SoundInput
let mic;
let micLevel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(198, 255, 26);
  noStroke();
  
  xStep = width / 120;

  //soundInput
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  // SoundInput
  micLevel = mic.getLevel();
  let val = map(micLevel, 0, 1, 0, 80); // empfindlichkeit
  fill(51);
  rect(xPos + offset, yPos, val, rowHeight);

  
  xPos = xPos + xStep;
  
  if(xPos > width) {
    
    if(offset === 0) {
      offset = 5;
    } else {
      offset = 0;
    }
    
    xPos = 0;
    yPos = yPos + rowHeight / 3 * 2;
  }
  
  if(yPos > height) {
    noLoop();
    save()
  }
}


// Text
if(micLevel>0)
textSize (50)
text ('Das ist ein Text', 50,200)

function mousePressed() {
  userStartAudio();
}