import {createPost, SIMILAR_POST_COUNT} from './data.js';

const similarWizards = Array.from({ length: SIMILAR_POST_COUNT }, createPost);
similarWizards.forEach((val) => {
  const ent = Object.entries(val);
  console.log(`[${ent[0]}]\n[${ent[1]}]\n[${ent[2]}]\n[${ent[3]}]`);
  console.log(ent[4]);
});
