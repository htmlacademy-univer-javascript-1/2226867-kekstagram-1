import {MiniatureClickHandler} from './full-pictures.js';
import { getData } from './api.js';
import { showAlert, RERENDER_DELAY } from './util.js';
import './preview.js';

const picturesContainer = document.querySelector('.pictures');
const similarListFragment = document.createDocumentFragment();
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const buttonDefault = document.querySelector('[id=filter-default]');
const buttonRandom = document.querySelector('[id=filter-random]');
const buttonDiscussed = document.querySelector('[id=filter-discussed]');
const lastPosts = new Set();

function createNewPicture({url, description, likes, comments}){
  const postElement = similarPictureTemplate.cloneNode(true);
  const img = postElement.querySelector('.picture__img');
  img.src = url;
  img.alt=description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(postElement);
  lastPosts.add(postElement);
  MiniatureClickHandler(postElement,{url, description, likes, comments});
  picturesContainer.appendChild(similarListFragment);
}

const createNewPictures = (posts) => {
  for (const post of lastPosts) {
    if (picturesContainer.contains(post)) {
      picturesContainer.removeChild(post);
    }
  }
  lastPosts.clear();
  for (const post of posts) {
    createNewPicture(post);
  }
};

const rendering = (posts) => {
  createNewPictures(posts);
  const allPosts = new Set();
  for (const post of posts) {
    allPosts.add(post);
  }
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');
  const filterButton = document.querySelector('.img-filters__form');
  let currentFilter = 'filter-default';
  let timeoutId;
  filterButton.addEventListener('click', (evt) => {
    let renderingPosts;
    switch (evt.target.id) {
      case 'filter-default':
        renderingPosts = allPosts;
        buttonDefault.classList.add('img-filters__button--active');
        buttonRandom.classList.remove('img-filters__button--active');
        buttonDiscussed.classList.remove('img-filters__button--active');
        break;
      case 'filter-random':
        renderingPosts = posts.sort(() => Math.random() - 0.5);
        renderingPosts.length = 10;
        buttonDefault.classList.remove('img-filters__button--active');
        buttonRandom.classList.add('img-filters__button--active');
        buttonDiscussed.classList.remove('img-filters__button--active');
        break;
      case 'filter-discussed':
        renderingPosts = posts.sort((a, b) => b.comments.length - a.comments.length);
        buttonDefault.classList.remove('img-filters__button--active');
        buttonRandom.classList.remove('img-filters__button--active');
        buttonDiscussed.classList.add('img-filters__button--active');
        break;
      default:
        currentFilter = evt.target.id;
        break;
    }
    if (evt.target.id !== currentFilter) {
      currentFilter = evt.target.id;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => createNewPictures(renderingPosts), RERENDER_DELAY);
    }
  });
};

getData((posts) => {
  rendering(posts);
},
() => {
  showAlert('Не удалось загрузить данные. Попробуйте перезагрузить страницу', 0);
});
