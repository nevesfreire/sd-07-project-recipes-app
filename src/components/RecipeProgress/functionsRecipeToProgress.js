const streakIngredient = (key, event, page, id, index) => {
  const { target } = event;
  const element = document.getElementById(key);
  const lineTh = 'line-through';
  const elementText = element.innerText;
  const type = `${page}s`;
  const idd = parseInt(id);

  if (target.checked === true && element.style.textDecoration !== lineTh) {
    element.style.textDecoration = lineTh;
  }
  if (target.checked === false && element.style.textDecoration === lineTh) {
    element.style.textDecoration = '';
  }
  const lS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (lS.[type].[idd].[index].[elementText] === false){
    lS.[type].[idd].[index].[elementText] = true;
  } else {
    lS.[type].[idd].[index].[elementText] = false;
  }
  const output = JSON.stringify(lS);
  localStorage.setItem('inProgressRecipes', output);
};

const isChecked = (ing, page, id, index) => {
  const type = `${page}s`;
  const idd = parseInt(id);
  const lS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(lS.[type].[idd].[index].[ing])
  return lS.[type].[idd].[index].[ing];
}

export default {
  streakIngredient,
  isChecked,
};
