export const mapMealAndDrinkToRecipe = (recipesList) => (!recipesList
  ? []
  : recipesList.map((mealOrDrink) => (
    Object.prototype.hasOwnProperty.call(mealOrDrink, 'idMeal')
      ? {
        ...mealOrDrink,
        type: 'comida',
        id: mealOrDrink.idMeal,
        name: mealOrDrink.strMeal,
        category: mealOrDrink.strCategory,
        tags: mealOrDrink.strTags != null ? mealOrDrink.strTags.split(',') : [],
        strYoutube: mealOrDrink.strYoutube,
        strInstructions: mealOrDrink.strInstructions,
        image: mealOrDrink.strMealThumb,
        strGlass: '',
        alcoholicOrNot: '',
        area: mealOrDrink.strArea,
      } : {
        ...mealOrDrink,
        type: 'bebida',
        id: mealOrDrink.idDrink,
        name: mealOrDrink.strDrink,
        category: mealOrDrink.strCategory,
        tags: mealOrDrink.strTags != null ? mealOrDrink.strTags.split(',') : [],
        strYoutube: '',
        strInstructions: mealOrDrink.strInstructions,
        image: mealOrDrink.strDrinkThumb,
        strGlass: mealOrDrink.strGlass,
        alcoholicOrNot: mealOrDrink.strAlcoholic,
        area: '',
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
      }
  )));

export const mapShortMealAndDrinkToRecipe = (recipesList) => (!recipesList
  ? []
  : recipesList
    .map((mealOrDrink) => (
      Object.prototype.hasOwnProperty.call(mealOrDrink, 'idMeal')
        ? {
          type: 'comida',
          id: mealOrDrink.idMeal,
          name: mealOrDrink.strMeal,
          image: mealOrDrink.strMealThumb,
        } : {
          type: 'bebida',
          id: mealOrDrink.idDrink,
          name: mealOrDrink.strDrink,
          image: mealOrDrink.strDrinkThumb,
        }
    )));

export const mapIngredientList = (ingredients) => (!ingredients
  ? []
  : ingredients
    .map((ingredient) => (
      Object.prototype.hasOwnProperty.call(ingredient, 'idIngredient')
        ? {
          name: ingredient.strIngredient,
          image: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`,
        } : {
          name: ingredient.strIngredient1,
          image: `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`,
        }
    )));

export const resumeMealAndDrinkRecipe = ({
  id, type, area, category, alcoholicOrNot, name, image }) => (
  {
    id,
    type,
    area: area || '',
    category,
    alcoholicOrNot: alcoholicOrNot || '',
    name,
    image,
  }
);

export const nowDateFormated = () => {
  const TWO = 2;
  const date = new Date();
  const day = date.getDate().toString().padStart(TWO, '0');
  const month = (date.getMonth() + 1).toString().padStart(TWO, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDoneMealAndDrinkRecipe = ({
  id, type, area, category, alcoholicOrNot, name, image, tags }) => (
  {
    id,
    type,
    area: area || '',
    category,
    alcoholicOrNot: alcoholicOrNot || '',
    name,
    image,
    doneDate: nowDateFormated(),
    tags,
  }
);

export const mapIngredientsAndMeasuresToList = (recipe) => {
  const NUM_MAX_INGREDIENTS = 20;
  const ingredientsAndMeasuresList = [];
  let index = 1;
  let ingredient = recipe[`strIngredient${index}`];
  let measure = recipe[`strMeasure${index}`];
  while (
    (ingredient && measure
    && ingredient !== '' && ingredient !== null
    && measure !== '' && measure !== null)
    && index <= NUM_MAX_INGREDIENTS) {
    ingredientsAndMeasuresList.push({
      ingredient,
      measure,
      text: `${ingredient} - ${measure}`,
    });
    index += 1;
    ingredient = recipe[`strIngredient${index}`];
    measure = recipe[`strMeasure${index}`];
  }
  return ingredientsAndMeasuresList;
};
