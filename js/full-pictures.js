import {isEscapeKey} from './util.js';
const body = document.querySelector('body');
const buttonClose = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img img');
const likeCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.comments-count');
const caption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const similarCommentTemplate = document.querySelector('#comment-template')
  .content
  .querySelector('li');


const MiniatureClickHandler = function(imgOpen, {url, description, likes, comments}){
  imgOpen.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    img.src=url;
    likeCount.textContent=likes;
    commentCount.textContent=comments.length;
    caption.textContent=description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
    for(let i=0; i<comments.length; i++) {
      const newComment = similarCommentTemplate.cloneNode(true);
      const avatarUser = newComment.querySelector('img');
      avatarUser.src=comments[i].avatar;
      avatarUser.alt=comments[i].name;
      newComment.querySelector('p').textContent=comments[i].message;
      commentsList.append(newComment);
    }
    buttonClose.addEventListener('click', closeFullPicture);
    document.addEventListener('keydown', onEscapeKey);
  });
};

function onEscapeKey () {
  if (isEscapeKey) {
    closeFullPicture();
  }
}

function closeFullPicture(){
  commentsList.innerHTML='';
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  buttonClose.removeEventListener('click', closeFullPicture);
  document.removeEventListener('keydown', onEscapeKey);
}

export {MiniatureClickHandler};

