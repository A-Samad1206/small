const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
let currentCharacter;

playButton.addEventListener('click', () => {
  playText(textInput.value);
});
pauseButton.addEventListener('click', pauseText);
stopButton.addEventListener('click', stopText);

const utterence = new SpeechSynthesisUtterance();
utterence.addEventListener('end', () => {
  textInput.disabled = false;
});
utterence.addEventListener('boundary', (e) => {
  currentCharacter = e.charIndex;
});
speedInput.addEventListener('click', () => {
  stopText();
  playText(utterence.text.substring(currentCharacter));
});

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return;
  utterence.rate = speedInput.value || 1;
  utterence.text = text;
  textInput.disabled = true;
  speechSynthesis.speak(utterence);
}

function pauseText() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  } else {
  }
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
