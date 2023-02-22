var result = document.getElementById('editableText');
var speechRecognizer = new webkitSpeechRecognition();
var microphoneButton = $(".audio");
var recordingStatus = document.getElementById('recording-state')


// live speech function
function startConverting() {

  if ('webkitSpeechRecognition' in window) {
    // the controller interface for the recognition service; this also handles the SpeechRecognitionEvent sent from the recognition service.
    speechRecognizer.continuous = true;
    // Controls whether continuous results are returned for each recognition, or only a single result. Defaults to single (false.)
    speechRecognizer.interimResults = true;
    // Controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult.isFinal property is false.)
    speechRecognizer.lang = 'de-DE';

    speechRecognizer.start();
    recordingStatus.textContent = 'Sprich!'

    // initialize the var for the final output as an empty string
    var finalTranscripts = '';

    speechRecognizer.onresult = function(event) {
      var interimTranscripts = '';
      // initialize a var to keep adding any new results to the transcript
      for (var i = event.resultIndex; i < event.results.length; i++) {
        // initialize the transcript variable that is every word (result) combined
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        // if the speech is stopped, add the transcript to the final transcript, otherwise continue adding the transcript to the temp transcript
        if (event.results[i].isFinal) {
          finalTranscripts += transcript
        } else {
          interimTranscripts += transcript;
        }
      }
      // TODO: split characters for more granular animation control
      // add the temp transcript to the final whenever it finishes listening
      result.textContent = finalTranscripts + interimTranscripts;
      // var letters = Array.from(result.textContent).join("")
      // result.textContent = letters;


    };

    speechRecognizer.onerror = function(event) {
      console.log('oops! Ein Fehler ist aufgetreten.' + event.error)
    };
  } else {
    result.textContent =
      'Ihr Browser wird nicht unterstützt. Bitte laden Sie Google Chrome herunter oder aktualisieren Sie Ihr Google Chrome!!!';
  }

}

// playback controls

function stopConverting() {
  speechRecognizer.stop();
  recordingStatus.textContent =
    'Klicken Sie auf das Mikrofon, um die Aufnahme erneut zu starten..'
}

microphoneButton.click(function() {
  return (this.isConverting = !this.isConverting) ?
    startConverting() : stopConverting();
});

microphoneButton.click(function() {
  var micButton = $(".audio");
  micButton.toggleClass('icon-pressed');
})