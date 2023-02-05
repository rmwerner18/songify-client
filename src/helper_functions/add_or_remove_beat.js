export const addOrRemoveBeat = (beatArray, id) => {
  if (beatArray.includes(parseInt(id))) {
    let index = beatArray.findIndex((n) => n === parseInt(id));
    beatArray.splice(index, 1);
  } else {
    beatArray.push(parseInt(id));
  }
  return beatArray;
};
