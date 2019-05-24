const inputBox = document.querySelector('#input-box');

inputBox.addEventListener('input', handleInput);

function handleInput(event) {
  const inputIsGood = (
    Number.isInteger(+event.target.value)
    && +event.target.value >= 1
    && +event.target.value <= 9
  );

  if (inputIsGood) {
    event.target.value = (+event.target.value).toString();
  } else {
    event.target.value = '';
  }
}