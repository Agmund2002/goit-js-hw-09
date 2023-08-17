function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const body = document.querySelector('body');
const btn = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]')
}

let idInterval = null;
btn.stop.disabled = true;

btn.start.addEventListener('click', handlerStart);
btn.stop.addEventListener('click', handlerStop);

function handlerStart() {
    btn.start.disabled = true;
    btn.stop.disabled = false;

    body.style.backgroundColor = getRandomHexColor();
    idInterval = setInterval(() => body.style.backgroundColor = getRandomHexColor(), 1000);
}

function handlerStop() {
    btn.start.disabled = false;
    btn.stop.disabled = true;

    clearInterval(idInterval);
}
