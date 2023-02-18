import {MiniatureClickHandler} from './full-pictures.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const similarListFragment = document.createDocumentFragment();
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

getData((posts) => {
  for (const post of posts) {
    createNewPicture(post);
  }
},
() => {
  showAlert('Не удалось загрузить данные. Попробуйте перезагрузить страницу', 0);
});

function createNewPicture({url, description, likes, comments}){
  const postElement = similarPictureTemplate.cloneNode(true);
  const img = postElement.querySelector('.picture__img');
  img.src = url;
  img.alt=description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(postElement);
  MiniatureClickHandler(postElement,{url, description, likes, comments});
  picturesContainer.appendChild(similarListFragment);
}


export {createNewPicture};
