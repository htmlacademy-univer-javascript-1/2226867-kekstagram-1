<<<<<<< HEAD
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

const SIMILAR_WIZARD_COUNT = 4;
const SIMILAR_COMMENT_COUNT = 4;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

let idNum = 0;
const createComment = () => ({
  id: idNum++,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svj`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createWizard = () => {
  const id=getRandomPositiveInteger(1, 25);
  return{
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[id-1],
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({ length: SIMILAR_COMMENT_COUNT }, createComment)
  };
};

const similarWizards = Array.from({ length: SIMILAR_WIZARD_COUNT }, createWizard);
similarWizards.forEach((val) => {
  const ent = Object.entries(val);
  console.log(`[${ent[0]}]\n[${ent[1]}]\n[${ent[2]}]\n[${ent[3]}]`);
  console.log(ent[4]);
});
//console.log(similarWizards);
