var popupStyles = {
  a: {
    fontSize: '30vw',
    width: '80vw',
    paddingRight: '3vw'
  },
  b: {
    fontSize: '20vw',
    width: '60vw',
    paddingRight: '2vw'
  },
  c: {
    fontSize: '8.5vw',
    width: '40vw',
    paddingRight: '1vw'

  },
  d: {
    fontSize: '5vw',
    width: '20vw',
    paddingRight: '0.7vw'
  }
}

var popupIntroStyles = {
  a: {
    fontSize: '10vw',
    width: '40vw'
  },
  b: {
    fontSize: '5vw',
    width: '20vw'
  },
  c: {
    fontSize: '5vw',
    width: '60vw'
  },
  d: {
    fontSize: '10vw',
    width: '60vw'
  }
}

var startPopupsData = [
  {
    content: 'Hannes Bajohr',
    html: 'H&nbsp;a&nbsp;n&nbsp;n&nbsp;e&nbsp;s B&nbsp;a&nbsp;j&nbsp;o&nbsp;h&nbsp;r',
    inverted: false,
    position: {
      x: '54vw',
      y: '8vw'
    },
    category: 'a'
  },
  {
    content: '0x0a',
    html: '0 x 0 a',
    inverted: false,
    position: {
      x: '2vw',
      y: '30vw'
    },
    category: 'b'
  },

  /*
  {
    content: '[All erotic stories from literotica.com, parsed for non-English words with repeating characters using a Python script, sorted alphabetically; stories gathered as corpus by using the web scraper Kimono (10 million entries, 52,000 lemmata).]',
    html: '[All erotic stories from lit&shy;erotica.com, parsed for non-English words with repeating characters using a Python script, sorted alphabetically; stories gathered as corpus by using the web scraper Kimono (10 million entries, 52,000 lemmata).]',
    inverted: true,
    position: {
      x: '20vw',
      y: '22vw'
    },
    category: 'c'
  },
  {
    content: 'TURN SOUND ON',
    html: 'T U R N SOUND&nbsp;ON',
    inverted: false,
    position: {
      x: '5vw',
      y: '46vw'
    },
    category: 'd'
  },
  {
    content: 'CLICK THE WORDS AND LISTEN',
    html: 'C L I C K THE&nbsp;WORDS AND LISTEN',
    inverted: false,
    position: {
      x: '27vw',
      y: '63vw'
    },
    category: 'd'
  }
];
*/


var allowRowSpeech = false;

function getPopupStyleByContentLength(contentLength) {
  // breakpoints for popup styling categories
  var breakpointA = 3;
  var breakpointB = 11;
  var breakpointC = 20;

  var style = popupStyles.a;
  if (contentLength > breakpointA && contentLength <= breakpointB) {
    style = popupStyles.b;
  } else if (contentLength > breakpointB && contentLength <= breakpointC) {
    style = popupStyles.c;
  } else if (contentLength > breakpointC) {
    style = popupStyles.d;
  }

  return style;
}

function createPopUp(content, parentElement, position, popupStyle, inverted=false, popupIndex) {
  var totalPopups = document.getElementsByClassName('popup');

  // create popup
  var popUp = document.createElement('div');
  popUp.classList.add('popup');
  if (popupIndex >= 0) {
    popUp.classList.add(`intro-${popupIndex}`);
  }
  popUp.innerHTML = content;
  popUp.style.left = position.x;
  popUp.style.zIndex = totalPopups.length;

  if (inverted) {
    popUp.style.backgroundColor = 'white';
    popUp.style.color = 'blue';
  }

  var isRowPopup = parentElement.classList.contains('textzeile');
  if (isRowPopup) {
    popUp.style.paddingRight = popupStyle.paddingRight;
    popUp.style.bottom = '8%';
    popUp.style.transform = 'translateX(-50%)';
  } else {
    popUp.style.top = position.y;
  }

  // popup categories style
  popUp.style.fontSize = popupStyle.fontSize;
  popUp.style.width = popupStyle.width;

  // create close `x`
  var closeElement = document.createElement('div');
  closeElement.innerHTML = 'X';
  closeElement.classList.add('popup-close');
  popUp.append(closeElement);

  closeElement.addEventListener('touchstart', () => popUp.remove());
  closeElement.addEventListener('mousedown', () => popUp.remove());

  // inject popup in row element
  parentElement.append(popUp);

  // FIXME: Shouldn't be solved with JS
  var fontSize = popUp.style.fontSize;
  var fontSizeInt = parseInt(fontSize.substring(0, fontSize.length - 2));
  var fontSizePx = window.innerWidth * (fontSizeInt / 100);
  var lineHeight = fontSizePx * 1.1;
  popUp.style.height = `${popUp.getBoundingClientRect().height - (lineHeight + 15)}px`;
}

function createRowPopup(rowElement) {
  var rowContent = rowElement.innerHTML;
  var parsedRowContent = rowContent.replace(/\s/g, ''); // remove spaces
  var parsedRowContentLength = parsedRowContent.length;
  var popupStyle = getPopupStyleByContentLength(parsedRowContentLength);

// Check if touch device or not
  if (event.changedTouches == undefined) {
    var popupPosition = { x: event.clientX + 'px', y: 0 };
  } else {
    var popupPosition = { x: event.changedTouches[0].pageX + 'px', y: 0 };
  }

  var isEvenNumber = parsedRowContentLength % 2 === 0;

  createPopUp(rowContent, rowElement, popupPosition, popupStyle, isEvenNumber);
  readText(parsedRowContent);
}


// handle clicked rows
/*
var handleClickedRow = function(event) {
  var isRow = event.target.classList.contains('textzeile');
  if (!isRow || !allowRowSpeech) {
    return;
  }

  var rowElement = event.target;
  var rowPopupElement = rowElement.getElementsByClassName('popup');
  var hasPopups = rowPopupElement.length >= 1;

  if (hasPopups) {
    rowPopupElement[0].remove();
  }

  createRowPopup(rowElement);
};

*/

function handleRowElements() {
  console.log('speech is ready!');

    $( "body" ).css( "background-color","white" );
    $( ".loader" ).css( "opacity","0" );

  // get all rows
  var rowElements = document.getElementsByClassName('textzeile');
  // add eventlisteners to rows
  [...rowElements].forEach((rowElement) => {
    rowElement.addEventListener('touchstart', handleClickedRow);
    rowElement.addEventListener('mousedown', handleClickedRow);
  });
}

function populateVoiceList() {
  var voices = window.speechSynthesis.getVoices();
  const voicesSelect = document.getElementById('voices');
  [...voices].forEach((voice, index) => {
    var option = document.createElement('option');
    option.value = voice.name;
    option.innerHTML = voice.name;

    voicesSelect.append(option);
  })
}

// init speechSynthesis
var speechSynthesis = window.speechSynthesis;
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {
    // populateVoiceList();
    handleRowElements();
  };
} else {
  // populateVoiceList();
  handleRowElements();
}

function getVoice(voices, name) {
  var voiceIndexFromAlex = voices.findIndex((voice) => (voice.voiceURI === name));
  return voices[voiceIndexFromAlex];
}

function readText(text, isIntro) {
  // initialize speech
  var spokenText = new SpeechSynthesisUtterance(text);

  // voice settings
  var voices = window.speechSynthesis.getVoices();

  // var voicesSelect = document.getElementById('voices');
  // var voiceName = voicesSelect.options[voicesSelect.selectedIndex].value;
  var voiceName = voices[0].name;
  var currentVoice = getVoice(voices, voiceName);

  spokenText.voice = currentVoice;
  spokenText.volume = 1;
  spokenText.pitch = 0.5;
  spokenText.rate = 0.7;


  if (isIntro) {
    // spokenText.addEventListener('start', handleSpeechEvent)
    spokenText.addEventListener('end', handleSpeechEvent);
    // spokenText.addEventListener('error', handleSpeechEvent);
    // spokenText.addEventListener('boundary', handleSpeechEvent);
    // spokenText.addEventListener('pause', handleSpeechEvent);
    // spokenText.addEventListener('resume', handleSpeechEvent);
  }

  speechSynthesis.speak(spokenText);
}

// // stop
// function stop() {
//   speechSynthesis.cancel();
// }

// // toggle speech
// function playpause() {
//   if (speechSynthesis.paused) {
//     speechSynthesis.resume();
//   } else {
//     speechSynthesis.pause();
//   }
// }

var introPopupCounter = 0;
function createIntroPopup() {
  var popupData = startPopupsData[introPopupCounter];
  createPopUp(popupData.html, document.body, popupData.position, popupIntroStyles[popupData.category], popupData.inverted, introPopupCounter);
  readText(popupData.content.substring(0, 96), true);
  introPopupCounter++;
}

function handleSpeechEvent(e) {
  // console.log('Speech Event:', e);
  allowRowSpeech = true;

  switch (e.type) {
    case 'start':
      console.log('start');
      break;
    case 'end':
      console.log('end');
      if (introPopupCounter < startPopupsData.length) {
        createIntroPopup();
      }
      break;
    case 'endEvent':
      console.log('endEvent');
      break;
    case 'error':
      console.log('error');
      break;
    case 'boundary':
      console.log('boundary');
      break;
    default:
      console.log('default');
      break;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var headlineElement = document.getElementsByClassName('headline')[0];

  document.body.addEventListener('mousedown', () => {
    if (introPopupCounter === 0) {
      createIntroPopup()
    }
  });

  document.body.addEventListener('touchend', () => {
    if (introPopupCounter === 0) {
      createIntroPopup()
    }
  });
});
