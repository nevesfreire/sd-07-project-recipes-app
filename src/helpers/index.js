// Progress Food
export const checkItem = (item, id) => {
  const teste = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!teste) {
    const inProgressRecipes = {
      meals: {
        [id]: [item],
      },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
  if (!teste.meals[id]) {
    const inProgressRecipes = {
      meals: {
        ...teste.meals,
        [id]: [item],
      },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
  const inProgressRecipes = {
    ...teste,
    meals: {
      ...teste.meals,
      [id]: [...teste.meals[id], item],
    },
  };
  return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const checkedIsTreu = ({ target }, callback, id) => {
  const nodeListForAllCheckeBox = document.querySelectorAll('input');
  const arrayForAllCheckeBox = [];
  nodeListForAllCheckeBox.forEach((item) => arrayForAllCheckeBox.push(item));
  checkItem(target.id, id);
  if (arrayForAllCheckeBox.every((elem) => elem.checked === true)) callback(true);
  else callback(false);
};
