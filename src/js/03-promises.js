import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-notify-aio-3.2.6.min.js"

const form = document.querySelector('.form');
const {delay, step, amount} = form.elements;

form.addEventListener('submit', handlerForm);

// Функції

function handlerForm(evt) {
  evt.preventDefault();
  
  const numValue = {
    delay: Number(delay.value), 
    step: Number(step.value), 
    amount: Number(amount.value)
  }
  
  let count = 1;
  let delays = numValue.delay

  let timerId = setTimeout(function run() {
    createPromise(count, delays)
    .then(({ position, delayFunc }) => {
      Notify.success(`Fulfilled promise ${position} in ${delayFunc} ms`);
    })
    .catch(({ position, delayFunc }) => {
      Notify.failure(`Rejected promise ${position} in ${delayFunc} ms`)
    });

    count++;
    delays += numValue.step;

    timerId = setTimeout(run, delays)

    if (count > numValue.amount) {
      clearTimeout(timerId);
    }
  }, delays)

  evt.currentTarget.reset();
}

function createPromise(position, delayFunc) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      res({position, delayFunc});
    } else {
      rej({position, delayFunc});
    }
  })
}
