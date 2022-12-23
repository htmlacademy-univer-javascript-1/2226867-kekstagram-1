import {createPost, SIMILAR_POST_COUNT} from './data.js';
import {MiniatureClickHandler} from './full-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const similarPosts = Array.from({ length: SIMILAR_POST_COUNT }, createPost);
const similarListFragment = document.createDocumentFragment();
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

similarPosts.forEach(({url, description, likes, comments}) => {
  const postElement = similarPictureTemplate.cloneNode(true);
  const img = postElement.querySelector('.picture__img');
  img.src = url;
  img.alt=description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(postElement);
  MiniatureClickHandler(postElement,{url, description, likes, comments});
});

picturesContainer.appendChild(similarListFragment);
