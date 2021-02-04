const streakIngredient = (key, event, page, id, index) => {
  const { target } = event;
  const element = document.getElementById(key);
  const lineTh = 'line-through';
  const elementText = element.innerText;
  const type = `${page}s`;
  const idd = parseInt(id, 10);

  if (target.checked === true && element.style.textDecoration !== lineTh) {
    element.style.textDecoration = lineTh;
  }
  if (target.checked === false && element.style.textDecoration === lineTh) {
    element.style.textDecoration = '';
  }
  const lS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // eslint-disable-line
  if (lS[type][idd][index][elementText] === false) {
    // eslint-disable-line
    lS[type][idd][index][elementText] = true;
  } else {
    // eslint-disable-line
    lS[type][idd][index][elementText] = false;
  }
  const output = JSON.stringify(lS);
  localStorage.setItem('inProgressRecipes', output);
};

const isChecked = (ing, page, id, index) => {
  const type = `${page}s`;
  const idd = parseInt(id, 10);
  const lS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return lS.[type].[idd].[index].[ing];
};

export default {
  streakIngredient,
  isChecked,
};
