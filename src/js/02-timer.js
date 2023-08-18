import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const elems = {
    btn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

elems.btn.disabled = true;
let selectedDate = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        console.log(selectedDate);
      
      if (selectedDate > options.defaultDate) {
        elems.btn.disabled = false;
      } else {
        alert("Please choose a date in the future")
        elems.btn.disabled = true;
      }
    },
  };

flatpickr('#datetime-picker', options);

elems.btn.addEventListener('click', handlerBtn);

function handlerBtn(evt) {
    elems.btn.disabled = true;
    intervalId = setInterval(() => {
        const currentDate = new Date();
        const timer = selectedDate - currentDate;
        const convertedTime =  convertMs(timer);

        elems.days.textContent = convertedTime.days;
        elems.hours.textContent = convertedTime.hours;
        elems.minutes.textContent = convertedTime.minutes;
        elems.seconds.textContent = convertedTime.seconds;

        if (timer <= 0) {  
            clearInterval(intervalId);
            elems.btn.disabled = false;

            elems.days.textContent = 0;
            elems.hours.textContent = 0;
            elems.minutes.textContent = 0;
            elems.seconds.textContent = 0;
        }
    }, 1000);
}

// Службові функції

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