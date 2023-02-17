import {isEscapeKey} from './util.js';
const body = document.querySelector('body');
const buttonClose = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img img');
const likeCount = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');
const visibleCommentCount = bigPicture.querySelector('.visible-comments-count');
const commentCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const similarCommentTemplate = document.querySelector('#comment-template')
  .content
  .querySelector('li');
const NUM_OF_NEW_COMMENTS = 5;

const MiniatureClickHandler = function(imgOpen, {url, description, likes, comments}){
  imgOpen.addEventListener('click', () => {

    const onEscapeKey = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeFullPicture();
      }
    };

    const onCommentsLoader = function () {
      const start=Number(visibleCommentCount.textContent);
      if(comments.length<start+NUM_OF_NEW_COMMENTS){
        visibleCommentCount.textContent=comments.length;
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoader);
      } else {
        visibleCommentCount.textContent=start+NUM_OF_NEW_COMMENTS;
      }
      for(let i=start; i<start+NUM_OF_NEW_COMMENTS&&i<comments.length; i++) {
        const newComment = similarCommentTemplate.cloneNode(true);
        const avatarUser = newComment.querySelector('img');
        avatarUser.src=comments[i].avatar;
        avatarUser.alt=comments[i].name;
        newComment.querySelector('p').textContent=comments[i].message;
        commentsList.append(newComment);
      }
    };

    function closeFullPicture(){
      commentsList.innerHTML='';
      bigPicture.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoader);
      document.querySelector('body').classList.remove('modal-open');
      buttonClose.removeEventListener('click', closeFullPicture);
      document.removeEventListener('keydown', onEscapeKey);
    }

    bigPicture.classList.remove('hidden');
    img.src=url;
    likeCount.textContent=likes;
    commentCount.textContent=comments.length;
    visibleCommentCount.textContent = '0';
    if (visibleCommentCount.textContent>comments.length){
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoader);
    } else {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', onCommentsLoader);
    }
    onCommentsLoader();
    caption.textContent=description;
    body.classList.add('modal-open');
    buttonClose.addEventListener('click', closeFullPicture);
    document.addEventListener('keydown', onEscapeKey);
  });
};

export {MiniatureClickHandler};
