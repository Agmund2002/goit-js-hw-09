import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-notify-aio-3.2.6.min.js"

const elems = {
    btn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

elems.btn.disabled = true;

const vars = {
    selectedDate: null,
    intervalId: null,
    currentDate: null,
    timer: null,
    convertedTime: null
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        vars.selectedDate = selectedDates[0];
        console.log(vars.selectedDate);
      
      if (vars.selectedDate > options.defaultDate) {
        elems.btn.disabled = false;
      } else {
        Notify.failure("Please choose a date in the future");
        elems.btn.disabled = true;
      }
    },
  };

flatpickr('#datetime-picker', options);

elems.btn.addEventListener('click', handlerBtn);

// Функції

function handlerBtn() {
    elems.btn.disabled = true;

    now();

    vars.intervalId = setInterval(() => {
        now();

        if (vars.timer <= 0) {  
            clearInterval(vars.intervalId);
            elems.btn.disabled = false;

            elems.days.textContent = '00';
            elems.hours.textContent = '00';
            elems.minutes.textContent = '00';
            elems.seconds.textContent = '00';
        }
    }, 1000);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

function now() {
    vars.currentDate = new Date();
    vars.timer = vars.selectedDate - vars.currentDate + 1000;
    vars.convertedTime =  convertMs(vars.timer);

    elems.days.textContent = addLeadingZero(vars.convertedTime.days);
    elems.hours.textContent = addLeadingZero(vars.convertedTime.hours);
    elems.minutes.textContent = addLeadingZero(vars.convertedTime.minutes);
    elems.seconds.textContent = addLeadingZero(vars.convertedTime.seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }