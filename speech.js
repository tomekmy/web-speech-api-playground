// Check if  Web Speech API is supported
if (!('webkitSpeechRecognition' in window)) {
  // Something if not supported
} else {
  // If Web Speech API is supported...

  // Set default language / dialect.
  const selectedLanguage = 'pl-PL';

  let FinalTranscript = '';
  let recognizing = false;
  let IgnoreOnend;
  let startTimestamp;

  // Init Web Speech API
  const recognition = new webkitSpeechRecognition();
  // Default is false. If true recording don't stop when speaks ends
  recognition.continuous = false;
  // Default value for is false, meaning that the only results returned by the recognizer are final and will not change.
  recognition.interimResults = false;

  const startButton = (event) => {
    if (recognizing) {
      recognition.stop();
      return;
    }
    $('.button__dots').fadeIn(300);
    FinalTranscript = '';
    recognition.lang = selectedLanguage;
    recognition.start();
    IgnoreOnend = false;
    startTimestamp = event.timeStamp;
  };

  // Bind startButton function on microphone click
  $('.button__image').on('click', startButton);

  // On start recording
  recognition.onstart = () => {
    recognizing = true;
    $('.button__dots').fadeIn(300);
  };

  // On error
  recognition.onerror = (event) => {
    console.log('Event error:', event.error);
    if (event.error === 'no-speech') {
      $('.button__dots').fadeOut(300);
      IgnoreOnend = true;
    }
    if (event.error === 'audio-capture') {
      $('.button__dots').fadeOut(300);
      IgnoreOnend = true;
    }
    if (event.error === 'not-allowed') {
      if (event.timeStamp - startTimestamp < 100) {
      } else {
      }
      IgnoreOnend = true;
    }
  };

  // On recording end
  recognition.onend = () => {
    recognizing = false;
    if (IgnoreOnend) {
      return;
    }
    console.log('FinalTranscript: ', FinalTranscript);
    $('.button__dots').fadeOut(300);
  };

  // On recording result/s
  recognition.onresult = (event) => {
    if (typeof (event.results) === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        FinalTranscript += event.results[i][0].transcript;
      }
    }
  };
}
