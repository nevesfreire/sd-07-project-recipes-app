function getArrayIngredients(array) {
  const ZERO = 0;
  const arrayIngredients = [];
  const drinkKeys = Object
    .keys(array[0]).filter((item) => item.includes('Ingredient'));

  for (let index = ZERO; index < drinkKeys.length; index += 1) {
    if (array[0][drinkKeys[index]] && array[0][drinkKeys[index]] !== '') {
      arrayIngredients.push(array[0][drinkKeys[index]]);
    }
  }
  return arrayIngredients;
}

export default getArrayIngredients;
