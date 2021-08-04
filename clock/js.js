const hourHand = document.querySelector('[data-hand-hour]'),
  minuteHand = document.querySelector('[data-hand-minute]'),
  secondHand = document.querySelector('[data-hand-second]');

setInterval(setClock, 1000);
function setClock() {
  const currentTime = new Date();
  const secRatio = currentTime.getSeconds() / 60,
    minRatio = (secRatio + currentTime.getMinutes()) / 60,
    hourRatio = (minRatio + currentTime.getHours()) / 12;
  rotation(hourHand, hourRatio);
  rotation(minuteHand, minRatio);
  rotation(secondHand, secRatio);
}
function rotation(ele, rot) {
  ele.style.setProperty('--rotation', rot * 360);
}
setClock();
