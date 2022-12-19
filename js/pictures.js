import {createPost, SIMILAR_COMMENT_COUNT, SIMILAR_POST_COUNT} from './data.js';

const picturesContainer = document.querySelector('.pictures');
//picturesContainer.classList.remove('hidden');

//userDialog.querySelector('.setup-similar').classList.remove('hidden');

//const similarListElement = picturesContainer.querySelector('.setup-similar-list');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPosts = Array.from({ length: SIMILAR_POST_COUNT }, createPost);

const similarListFragment = document.createDocumentFragment();

similarPosts.forEach(({url, description, likes}) => {
  const postElement = similarPictureTemplate.cloneNode(true);
  const img = postElement.querySelector('.picture__img');
  img.src = url;
  img.alt=description;
  postElement.querySelector('.picture__comments').textContent = SIMILAR_COMMENT_COUNT;
  postElement.querySelector('.picture__likes').textContent = likes;
  //  const tempComm = postElement.querySelector('.picture__comments').remove;
  //const info = postElement.querySelector('.picture__info');
  //info.l
  similarListFragment.appendChild(postElement);
});
//console.log(similarListFragment);
picturesContainer.appendChild(similarListFragment);
