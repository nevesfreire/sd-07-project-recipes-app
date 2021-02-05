const endPointFoodIngredients = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const endPointFoodName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const endPointFoodFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const endPointDrinkIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const endPointDrinkName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const endPointDrinkFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const endPointIdFood = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const endPointIdDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const endPointFilterFood = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const endPointFilterDrink = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const endPointIngredientFoodList = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

const endPointIngredientDrinkList = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

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

export const getCategoryFoods = async () => {
  try {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json());
    return meals;
  } catch (error) {
    return 'error';
  }
};

export const getCategoryDrinks = async () => {
  try {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json());
    return drinks;
  } catch (error) {
    return 'error';
  }
};

export const filterFoodCategory = async (category) => {
  try {
    const { meals } = await fetch(`${endPointFilterFood}${category}`)
      .then((result) => result.json());
    return meals;
  } catch (error) {
    return 'error';
  }
};

export const filterDrinkCategory = async (category) => {
  try {
    const { drinks } = await fetch(`${endPointFilterDrink}${category}`)
      .then((result) => result.json());
    return drinks;
  } catch (error) {
    return 'error';
  }
};
export const getIngredientsFoodList = async () => {
  try {
    const { meals } = await fetch(endPointIngredientFoodList)
      .then((result) => result.json());
    return meals;
  } catch (err) {
    return 'erro';
  }
};

export const getIngredientsDrinkList = async () => {
  try {
    const { drinks } = await fetch(endPointIngredientDrinkList)
      .then((result) => result.json());
    return drinks;
  } catch (err) {
    return 'erro';
  }
};
