const getKeys = (array) => Object
  .keys(array[0]).filter((item) => item.includes('Ingredient'));

function getArrayIngredientsAndMeasures(array) {
  const ONE = 1;
  const ingredientsAndMeasures = [];

  const drinkKeys = getKeys(array);

  for (let index = ONE; index <= drinkKeys.length; index += 1) {
    const ingredient = `strIngredient${index}`;
    const measure = `strMeasure${index}`;

    if (array[0][ingredient]) {
      const key = `${array[0][ingredient]}`;
      ingredientsAndMeasures.push({ [key]: array[0][measure] || '' });
    }
  }
  return ingredientsAndMeasures;
}

export default getArrayIngredientsAndMeasures;
