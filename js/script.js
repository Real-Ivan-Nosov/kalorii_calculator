const submitBtn = document.querySelector('.form__submit-button');
const resetBtn = document.querySelector('.form__reset-button');

const resultMessage = document.querySelector('.counter__result');

const normCalories = document.querySelector('#calories-norm');
const minimalCalories = document.querySelector('#calories-minimal');
const maximalCalories = document.querySelector('#calories-maximal');

const currentAge = document.querySelector('#age');
const currentHeight = document.querySelector('#height');
const currentWeight = document.querySelector('#weight');

let numAge = parseInt(currentAge.value);
let numHeight = parseInt(currentHeight.value);
let numWeight = parseInt(currentWeight.value);

// funcs
const checkAllReady = () => {
  if (numAge > 0 && numHeight > 0 && numWeight > 0) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

const checkOneReady = () => {
  if (numAge > 0 || numHeight > 0 || numWeight > 0) {
    resetBtn.disabled = false;
  } else {
    resetBtn.disabled = true;
  }
}

const getResults = (keep, up, loose) => {
  normCalories.textContent = keep;
  minimalCalories.textContent = loose;
  maximalCalories.textContent = up;
}

const calculateCalories = (currentGender, currentActivity) => {
  let numActivity = 1.2;
  let keepWeightCalories;
  let upWeightCalories;
  let looseWeightCalories;

  switch (currentActivity.value) {
    case 'min':
      numActivity = 1.2;
      break;
    case 'low':
      numActivity = 1.375;
      break;
    case 'medium':
      numActivity = 1.55;
      break;
    case 'high':
      numActivity = 1.725;
      break;
    case 'max':
      numActivity = 1.9;
  }

  if (currentGender.value === 'male') {
    keepWeightCalories = parseInt(((10 * numWeight) + (6.25 * numHeight) - (5 * numAge) + 5) * numActivity);
  } else {
    keepWeightCalories = parseInt(((10 * numWeight) + (6.25 * numHeight) - (5 * numAge) - 161) * numActivity);
  }
  upWeightCalories = keepWeightCalories + keepWeightCalories * 0.15;
  looseWeightCalories = keepWeightCalories - keepWeightCalories * 0.15;

  getResults(keepWeightCalories, upWeightCalories, looseWeightCalories);
}

// listeners
currentAge.addEventListener('change', (e) => {
  e.preventDefault();
  numAge = parseInt(currentAge.value)
  checkAllReady();
  checkOneReady();
})

currentHeight.addEventListener('change', (e) => {
  e.preventDefault();
  numHeight = parseInt(currentHeight.value);
  checkAllReady();
  checkOneReady();
})

currentWeight.addEventListener('change', (e) => {
  e.preventDefault();
  numWeight = parseInt(currentWeight.value);
  checkAllReady();
  checkOneReady();
})

resetBtn.addEventListener('click', (e) => {
  numAge = 0;
  numHeight = 0;
  numWeight = 0;
  currentAge.value = '';
  currentHeight.value = '';
  currentWeight.value = '';
  resultMessage.classList.add('counter__result--hidden');
  resetBtn.disabled = true;
  submitBtn.disabled = true;
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let currentGender = document.querySelector('input[name="gender"]:checked');
  let currentActivity = document.querySelector('input[name="activity"]:checked');
  calculateCalories(currentGender, currentActivity);
  resultMessage.classList.remove('counter__result--hidden');
})