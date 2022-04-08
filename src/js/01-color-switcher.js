'use ctrict';

const buttonStartEl = document.querySelector('button[data-start]');
const buttonStoptEl = document.querySelector('button[data-stop]');

let bgChangerInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStartEl.addEventListener('click', () => {
  bgChangerInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStartEl.setAttribute('disabled', 1);
  buttonStoptEl.removeAttribute('disabled');
});

buttonStoptEl.addEventListener('click', () => {
  clearInterval(bgChangerInterval);
  buttonStoptEl.setAttribute('disabled', 1);
  buttonStartEl.removeAttribute('disabled');
});
