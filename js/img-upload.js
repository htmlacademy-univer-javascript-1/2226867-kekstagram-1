import { isEscapeKey } from './util.js';

const uploadOpenElement = document.querySelector('#upload-file');
const uploadCloseElement = document.querySelector('#upload-cancel');
const form = document.querySelector('#upload-select-image');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const body = document.querySelector('body');

const checkTags = function (str) {
  const tags = str.split(' ');
  if (tags.length > 5) {
    return false;
  }
  else {
    const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    for (let i = 0; i < tags.length; i++) {
      if (!regex.test(tags[i])) {
        return false;
      }
    }
    for (let i = 0; i < tags.length - 1; i++) {
      for (let j = i + 1; j < tags.length; j++) {
        if (tags[i].substring(1).toLowerCase() === tags[j].substring(1).toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  }
};

uploadOpenElement.addEventListener('click', onOpenUploadClick);

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseUploadClick();
  }
};

const onSibmitClick = (evt) => {
  evt.preventDefault();
  checkTags(hashtags.value);
};

function onCloseUploadClick () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');
  document.querySelector('#upload-file').value = '';

  uploadCloseElement.removeEventListener('click', onCloseUploadClick);
  document.removeEventListener('keydown', onUploadEscapeKeydown);
}

function onOpenUploadClick () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');

  uploadCloseElement.addEventListener('click', onCloseUploadClick);
  document.addEventListener('keydown', onUploadEscapeKeydown);
  form.addEventListener('submit', onSibmitClick);
}

const onFocusEscapeKeydown = (evt) => {
  evt.stopPropagation();
};
hashtags.onfocus = () => {
  hashtags.addEventListener('keydown', onFocusEscapeKeydown);
};
hashtags.onblur = () => {
  hashtags.removeEventListener('keydown', onFocusEscapeKeydown);
};

comment.onfocus = () => {
  comment.addEventListener('keydown', onFocusEscapeKeydown);
};
comment.onblur = () => {
  comment.removeEventListener('keydown', onFocusEscapeKeydown);
};


