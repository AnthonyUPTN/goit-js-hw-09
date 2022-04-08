'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startButtonEl = document.querySelector('button[data-start]');
const dateInputEl = document.querySelector('#datetime-picker');

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function checkTimer() {
  if (Number(document.querySelector('span[data-seconds]').textContent) <= 0) {
    clearInterval(intervalId);
  }
}

function convertMs(convertedDate) {
  const days = Math.floor(convertedDate / 1000 / 60 / 60 / 24);
  const hours = Math.floor(convertedDate / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(convertedDate / 1000 / 60) % 60;
  const seconds = Math.floor(convertedDate / 1000) % 60;

  return { days, hours, minutes, seconds };
}

let now = new Date();
startButtonEl.setAttribute('disabled', 'disabled');

flatpickr(dateInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Number(now) > Number(selectedDates[0])) {
      clearInterval(intervalId);
      startButtonEl.setAttribute('disabled', 'disabled');
      Notify.failure('Please choose a date in the future');
    } else {
      startButtonEl.removeAttribute('disabled');
    }
  },
});

let DEADLINE = null;
let intervalId = null;

startButtonEl.addEventListener('click', event => {
  intervalId = setInterval(() => {
    DEADLINE = new Date(dateInputEl.value);
    const convertedDate = convertMs(Number(DEADLINE) - Number(new Date()));
    document.querySelector('span[data-days]').textContent = addLeadingZero(convertedDate.days);
    document.querySelector('span[data-hours]').textContent = addLeadingZero(convertedDate.hours);
    document.querySelector('span[data-minutes]').textContent = addLeadingZero(
      convertedDate.minutes,
    );
    document.querySelector('span[data-seconds]').textContent = addLeadingZero(
      convertedDate.seconds,
    );
    checkTimer();
  }, 1000);
});
