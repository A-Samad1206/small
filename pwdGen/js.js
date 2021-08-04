//sync range nmumber field
const tar = (val) => document.querySelector(val);

const rangeOfChar = tar('#rangeOfChar'),
  numberOfChar = tar('#numberOfChar'),
  uppercase = tar('#uppercase'),
  numbers = tar('#numbers'),
  symbols = tar('#symbols'),
  form = tar('#form'),
  display = tar('#display');

const UPPERCASE_CHAR_CODES = arrFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrFromLowToHigh(33, 47)
  .concat(arrFromLowToHigh(58, 64))
  .concat(arrFromLowToHigh(91, 96))
  .concat(arrFromLowToHigh(123, 126));

rangeOfChar.oninput = syncNumOfChar;
numberOfChar.oninput = syncNumOfChar;
function syncNumOfChar(e) {
  const val = e.target.value;
  numberOfChar.value = val;
  rangeOfChar.value = val;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();

  genPass();
});

function genPass() {
  const length = numberOfChar.value,
    incUppercase = uppercase.checked,
    incNumbers = numbers.checked,
    incSymbols = symbols.checked;

  let charCodes = [];
  charCodes = [...charCodes, ...LOWERCASE_CHAR_CODES];
  if (incUppercase) {
    console.log('Uppercase');
    charCodes = [...charCodes, ...UPPERCASE_CHAR_CODES];

    // charCodes.concat(UPPERCASE_CHAR_CODES);
    // console.log('charCodescharCodes', charCodes);
  }
  if (incNumbers) {
    console.log('Numbers');
    charCodes = [...charCodes, ...NUMBER_CHAR_CODES];
  }
  if (incSymbols) {
    console.log('Symbols');
    charCodes = [...charCodes, ...SYMBOL_CHAR_CODES];
  }
  let passChar = [];
  for (let i = 0; i < length; i++) {
    const character = charCodes[Math.floor(Math.random() * charCodes.length)];

    passChar.push(character);
  }
  display.innerText = passChar.join('');

  // return JSON.stringify(passChar.join(''));
}

function arrFromLowToHigh(low, high) {
  const arr = [];
  for (let i = low; i < high; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}
