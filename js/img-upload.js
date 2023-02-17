import { isEscapeKey } from './util.js';

const uploadOpenElement = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const uploadCloseElement = document.querySelector('#upload-cancel');
const form = document.querySelector('#upload-select-image');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const buttonScaleSmaller = overlayImage.querySelector('.scale__control--smaller');
const buttonScaleBigger = overlayImage.querySelector('.scale__control--bigger');
const scaleControl = overlayImage.querySelector('.scale__control--value');
const editedPicture = overlayImage.querySelector('.img-upload__preview');
const effects = overlayImage.querySelector('.effects__list');
const slider = overlayImage.querySelector('.effect-level__slider');
const effectLevelInput = overlayImage.querySelector('.effect-level__value');
const fieldSlider = overlayImage.querySelector('.img-upload__effect-level');
let checkedBox;

const closeOverlayImage = () => {
  uploadOpenElement.value = '';
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayEscKeydown);
  uploadCloseElement.removeEventListener('click', closeOverlayImage);
  hashtags.value = '';
  comment.value = '';
  submitButton.removeAttribute('disabled', 'true');
  slider.noUiSlider.destroy();

  form.removeEventListener('submit', submitListener);
  buttonScaleBigger.removeEventListener('click', changeScale);
  buttonScaleSmaller.removeEventListener('click', changeScale);
  effects.removeEventListener('change', changeEffectOfPicture);
};

function onOverlayEscKeydown(evt) {
  if (isEscapeKey(evt) && evt.target !== hashtags && evt.target !== comment) {
    evt.preventDefault();
    closeOverlayImage();
  }
}

function changeScale(evt) {
  const scaleValue = scaleControl.value.replace('%', '');
  if (evt.target === buttonScaleSmaller && scaleValue > 0) {
    scaleControl.value = `${parseInt(scaleValue, 10) - 25}%`;
    editedPicture.style.transform = `scale(${(parseInt(scaleValue, 10) - 25) / 100})`;
  } else if (evt.target === buttonScaleBigger && scaleValue < 100) {
    scaleControl.value = `${parseInt(scaleValue.replace(), 10) + 25}%`;
    editedPicture.style.transform = `scale(${(parseInt(scaleValue, 10) + 25) / 100})`;
  }
}

function changeEffectOfPicture(evt) {
  checkedBox = evt.target.id;
  let currentMin = 0;
  let currentMax = 100;
  let currentStart = 100;
  let currentStep = 1;
  switch (evt.target.id) {
    case 'effect-chrome':
      currentMin = 0;
      currentMax = 1;
      currentStep = 0.1;
      currentStart = 1;
      break;
    case 'effect-sepia':
      currentMin = 0;
      currentMax = 1;
      currentStep = 0.1;
      currentStart = 1;
      break;
    case 'effect-marvin':
      currentMin = 0;
      currentMax = 100;
      currentStep = 1;
      currentStart = 100;
      break;
    case 'effect-phobos':
      currentMin = 0;
      currentMax = 3;
      currentStep = 0.1;
      currentStart = 3;
      break;
    case 'effect-heat':
      currentMin = 1;
      currentMax = 3;
      currentStep = 0.1;
      currentStart = 3;
      break;
  }
  slider.noUiSlider.updateOptions({
    range: {
      min: currentMin,
      max: currentMax
    },
    start: currentStart,
    step: currentStep
  });
  if (evt.target.id !== 'effect-none') {
    fieldSlider.classList.remove('hidden');
  } else {
    fieldSlider.classList.add('hidden');
  }
  editedPicture.className = 'img-upload__preview';
  const effectPreview = evt.target.parentNode.querySelector('.effects__preview');
  editedPicture.classList.add(effectPreview.getAttribute('class').split('  ')[1]);
}

const changeEffectIntens = () => {
  const sliderValue = slider.noUiSlider.get();
  effectLevelInput.value = sliderValue;
  let filter;
  switch (checkedBox) {
    case 'effect-chrome':
      filter = `grayscale(${sliderValue})`;
      break;
    case 'effect-sepia':
      filter = `sepia(${sliderValue})`;
      break;
    case 'effect-marvin':
      filter = `invert(${sliderValue}%)`;
      break;
    case 'effect-phobos':
      filter = `blur(${sliderValue}px)`;
      break;
    case 'effect-heat':
      filter = `brightness(${sliderValue})`;
      break;
  }
  if (checkedBox === 'effect-none') {
    editedPicture.style.filter = '';
  } else {
    editedPicture.style.filter = filter;
  }
};

uploadOpenElement.addEventListener('change', (evt) => {
  document.addEventListener('keydown', onOverlayEscKeydown);

  uploadCloseElement.addEventListener('click', closeOverlayImage);

  scaleControl.value = `${100}%`;
  editedPicture.style.transform = `scale(${1})`;
  buttonScaleSmaller.addEventListener('click', changeScale);
  buttonScaleBigger.addEventListener('click', changeScale);

  editedPicture.classList.add('effects__preview--none');
  effects.addEventListener('change', changeEffectOfPicture);

  checkedBox = 'effect-none';
  editedPicture.className = 'img-upload__preview';
  fieldSlider.classList.add('hidden');
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100
  });
  slider.noUiSlider.on('update', () => {
    changeEffectIntens();
  });

  evt.preventDefault();
  form.addEventListener('submit', submitListener);
  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
});

let boolHashtagGlobal = true;
let boolCommentGlobal = true;

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

const controlSubmit = () => {
  if (!boolHashtagGlobal || !boolCommentGlobal) {
    submitButton.setAttribute('disabled', 'true');
  } else {
    submitButton.removeAttribute('disabled', 'true');
  }
};

const regHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;

const isCorrectHashtag = (value) => regHashtag.test(value);

const validateHashtag = (value) => {
  const hashtagsNew = value.split(' ');
  const bool = hashtagsNew.every(isCorrectHashtag);
  boolHashtagGlobal = bool;
  controlSubmit();
  return bool;
};

const isCorrectComment = (value) => value.length < 140;

const validateComment = (value) => {
  const bool = isCorrectComment(value);
  boolCommentGlobal = bool;
  controlSubmit();
  return bool;
};

pristine.addValidator(
  hashtags,
  validateHashtag,
  'Хэштег задан неправильно'
);

pristine.addValidator(
  comment,
  validateComment,
  'Комментарий не должен превышать 140 символов'
);

function submitListener(evt) {
  evt.preventDefault();
  pristine.validate();
}
