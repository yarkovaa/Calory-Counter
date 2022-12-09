const male = document.querySelector('input[id="gender-male"]');
const age = document.querySelector('input[id="age"]');
const height = document.querySelector('input[id="height"]');
const weight = document.querySelector('input[id="weight"]');
const radiosActivity = document.querySelectorAll('input[name="activity"]');
const calculate = document.querySelector('.form__submit-button');
const reset = document.querySelector('.form__reset-button');
const result = document.querySelector('.counter__result');
const form = document.querySelector('.counter__form');
const weightMaintenance = result.querySelector('#calories-norm');
const weightLoss = result.querySelector('#calories-minimal');
const weightGain = result.querySelector('#calories-maximal');

const defaultFun = () => {
  age.value = '';
  height.value = '';
  weight.value = '';
  male.checked = true;
  for (const activity of radiosActivity) {
    if (activity.value === 'min') {
      activity.checked = true;
    }
  }
  calculate.disabled = true;
  reset.disabled = true;
  result.classList.add('counter__result--hidden');
};

const checkValues = () => {
  if (age.value !== '' && height.value !== '' && weight.value !== '') {
    calculate.disabled = false;
  } else {
    calculate.disabled = true;
  }
  if (age.value !== '' || height.value !== '' || weight.value !== '') {
    reset.disabled = false;
  } else {
    reset.disabled = true;
  }
};

defaultFun();

age.addEventListener('input', checkValues);
height.addEventListener('input', checkValues);
weight.addEventListener('input', checkValues);
reset.addEventListener('click', defaultFun);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  result.classList.remove('counter__result--hidden');

  let coefficient = 1.2;
  for (const activity of radiosActivity) {
    if (activity.checked === true) {
      switch (activity.value) {
        case 'min':
          coefficient = 1.2;
          break;
        case 'low':
          coefficient = 1.375;
          break;
        case 'medium':
          coefficient = 1.55;
          break;
        case 'high':
          coefficient = 1.725;
          break;
        case 'max':
          coefficient = 1.9;
          break;
      }
    }
  }
  const n = (male.checked === true) ?
    (10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5 :
    (10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161;
  const norma = n * coefficient;

  weightMaintenance.textContent = (norma).toFixed(0);
  weightGain.textContent = (norma + norma * 0.15).toFixed(0);
  weightLoss.textContent = (norma - norma * 0.15).toFixed(0);
});
