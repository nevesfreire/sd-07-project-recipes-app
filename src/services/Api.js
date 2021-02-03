const endPointFoodIngredients = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const endPointFoodName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const endPointFoodFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const endPointDrinkIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const endPointDrinkName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const endPointDrinkFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const endPointIdFood = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const endPointIdDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const getFoodIngredients = async (ingredients) => {
  try {
    const { meals } = await fetch(`${endPointFoodIngredients}${ingredients}`)
      .then((result) => result.json());
    return meals;
  } catch (err) {
    return 'erro';
  }
};

export const getFoodName = async (name) => {
  try {
    const { meals } = await fetch(`${endPointFoodName}${name}`)
      .then((result) => result.json());
    return meals;
  } catch (err) {
    return 'erro';
  }
};

export const getFoodFirstLetter = async (letter) => {
  try {
    const { meals } = await fetch(`${endPointFoodFirstLetter}${letter}`)
      .then((result) => result.json());
    return meals;
  } catch (err) {
    return 'erro';
  }
};

export const getDrinkIngredients = async (ingredients) => {
  try {
    const { drinks } = await fetch(`${endPointDrinkIngredients}${ingredients}`)
      .then((result) => result.json());
    return drinks;
  } catch (err) {
    return 'erro';
  }
};

export const getDrinkName = async (name) => {
  try {
    const { drinks } = await fetch(`${endPointDrinkName}${name}`)
      .then((result) => result.json());
    return drinks;
  } catch (err) {
    return 'erro';
  }
};
export const getDrinkFirstLetter = async (letter) => {
  try {
    const { drinks } = await fetch(`${endPointDrinkFirstLetter}${letter}`)
      .then((result) => result.json());
    return drinks;
  } catch (err) {
    return 'erro';
  }
};

export const getFoodId = async (id) => {
  try {
    const { meals } = await fetch(`${endPointIdFood}${id}`)
      .then((result) => result.json());
    return meals;
  } catch (err) {
    return 'erro';
  }
};

export const getDrinkId = async (id) => {
  try {
    const { drinks } = await fetch(`${endPointIdDrink}${id}`)
      .then((result) => result.json());
    return drinks;
  } catch (err) {
    return 'erro';
  }
};
