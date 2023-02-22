
let audioContext;
let analyser;
var mousePos = {};
var mouseX, mouseY;


document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
})



let constraints = {
  audio: true
};
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    initAudio(stream);
    startDrawing();
  }).catch(err => {
    console.log(err);
  });

function initAudio(stream) {
  audioContext = new(window.AudioContext || window.webkitAudioContext)();
  let mediaStreamSource = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.75;
  mediaStreamSource.connect(analyser);
}

function startDrawing() {
  analyser.fftSize = 4096;
  analyser.minDecibels = -31;
  analyser.maxDecibels = 1;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Float32Array(bufferLength);


  function draw() {

    requestAnimationFrame(draw);
    analyser.getFloatFrequencyData(dataArray);

    var animateWord = function() {

      dataArray.forEach(function(frequency, i) {

        // function getRandomInt(top, bottom) {
        //   return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
        // }
// font-variation-settings:'temp' 700, 'yest' 148.08, 'grvt' 331.64
        var bump = 520;
        var frequency;
        var tempVal = frequency + 150;
       // var tempValHot = frequency + 950;
       // var tempColor = frequency + 520;
        // console.log(tempColor);
        var yestVal = frequency + 400
        var grvtVal = frequency + 600
       // var r = tempColor - 200;
        //var g = tempColor - 180;
       // var b = tempColor - 125;
       // var color = "rgb(" + r + "," + g + "," + b + ")"Alex 
       // var peakVal = 200;
        //  var peakColor = "rgba(241, 59,  33, 1)" Alex 

        
        // var fontstyles = "'temp'" + tempVal + ", " + " 'yest'" + yestVal + ", " + " 'grvt'" + grvtVal
        var fontstylescold = "'temp'" + tempVal + ", " + " 'yest'" + yestVal + ", " + " 'grvt'" + grvtVal
        var fontstyleshot = "'temp'" + tempValHot + ", " + " 'yest'" + yestVal + ", " + " 'grvt'" + grvtVal

        updateFontStyles(fontstylescold, fontstyleshot)
      });
    }
    animateWord();
  }
  draw();
}
var updateFontStyles = function(fontstylescold,fontstyleshot) {
  if (r > 180) {
   // editableText.style.color = peakColor;
    editableText.style.fontVariationSettings = fontstyleshot;
    
  } else {
    editableText.style.fontVariationSettings = fontstylescold;
   // editableText.style.color = color;

  }
}

updateFontStyles();









