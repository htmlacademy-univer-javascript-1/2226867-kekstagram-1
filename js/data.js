import {getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Пляж',
  'Указатель',
  'Снова пляж',
  'Леди',
  'Нечто съедобное',
  'Машина',
  'Клубника',
  'Напиток',
  'Пляж и самолет',
  'Система хранения',
  'Путь на пляж',
  'Машита похуже',
  'Здоровая еда?',
  'Котосуши',
  'Уги',
  'Небо',
  'Хор',
  'Ретро автомобиль',
  'Дискотапки',
  'Пальмы',
  'Каша',
  'Закат',
  'Краб',
  'Концерт',
  'Переправа'
];

const SIMILAR_POST_COUNT = 4;
const SIMILAR_COMMENT_COUNT = 4;

const getCommentId= createRandomIdFromRangeGenerator(1, SIMILAR_COMMENT_COUNT*SIMILAR_POST_COUNT*1000);

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svj`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => {
  const id=getRandomPositiveInteger(1, 25);
  return{
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[id-1],
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({ length: SIMILAR_COMMENT_COUNT }, createComment)
  };
};

export {createPost, SIMILAR_POST_COUNT, SIMILAR_COMMENT_COUNT};
