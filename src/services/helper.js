export const mapMealAndDrinkToRecipe = (recipesList) => (!recipesList
  ? []
  : recipesList.map((mealOrDrink) => (
    Object.prototype.hasOwnProperty.call(mealOrDrink, 'idMeal')
      ? {
        type: 'meal',
        id: mealOrDrink.idMeal,
        name: mealOrDrink.strMeal,
        strDrinkAlternate: mealOrDrink.strDrinkAlternate,
        category: mealOrDrink.strCategory,
        strTags: mealOrDrink.strTags,
        strYoutube: mealOrDrink.strYoutube,
        strInstructions: mealOrDrink.strInstructions,
        image: mealOrDrink.strMealThumb,
        dateModified: mealOrDrink.dateModified,
        strGlass: null,
        alcoholicOrNot: null,
        area: mealOrDrink.strArea,
        strIngredient1: mealOrDrink.strIngredient1,
        strIngredient2: mealOrDrink.strIngredient2,
        strIngredient3: mealOrDrink.strIngredient3,
        strIngredient4: mealOrDrink.strIngredient4,
        strIngredient5: mealOrDrink.strIngredient5,
        strIngredient6: mealOrDrink.strIngredient6,
        strIngredient7: mealOrDrink.strIngredient7,
        strIngredient8: mealOrDrink.strIngredient8,
        strIngredient9: mealOrDrink.strIngredient9,
        strIngredient10: mealOrDrink.strIngredient10,
        strIngredient11: mealOrDrink.strIngredient11,
        strIngredient12: mealOrDrink.strIngredient12,
        strIngredient13: mealOrDrink.strIngredient13,
        strIngredient14: mealOrDrink.strIngredient14,
        strIngredient15: mealOrDrink.strIngredient15,
        strMeasure1: mealOrDrink.strMeasure1,
        strMeasure2: mealOrDrink.strMeasure2,
        strMeasure3: mealOrDrink.strMeasure3,
        strMeasure4: mealOrDrink.strMeasure4,
        strMeasure5: mealOrDrink.strMeasure5,
        strMeasure6: mealOrDrink.strMeasure6,
        strMeasure7: mealOrDrink.strMeasure7,
        strMeasure8: mealOrDrink.strMeasure8,
        strMeasure9: mealOrDrink.strMeasure9,
        strMeasure10: mealOrDrink.strMeasure10,
        strMeasure11: mealOrDrink.strMeasure11,
        strMeasure12: mealOrDrink.strMeasure12,
        strMeasure13: mealOrDrink.strMeasure13,
        strMeasure14: mealOrDrink.strMeasure14,
        strMeasure15: mealOrDrink.strMeasure15,
        strIngredient16: mealOrDrink.strIngredient16,
        strIngredient17: mealOrDrink.strIngredient17,
        strIngredient18: mealOrDrink.strIngredient18,
        strIngredient19: mealOrDrink.strIngredient19,
        strIngredient20: mealOrDrink.strIngredient20,
        strMeasure16: mealOrDrink.strMeasure16,
        strMeasure17: mealOrDrink.strMeasure17,
        strMeasure18: mealOrDrink.strMeasure18,
        strMeasure19: mealOrDrink.strMeasure19,
        strMeasure20: mealOrDrink.strMeasure20,
      } : {
        type: 'drink',
        id: mealOrDrink.idDrink,
        name: mealOrDrink.strDrink,
        strDrinkAlternate: mealOrDrink.strDrinkAlternate,
        category: mealOrDrink.strCategory,
        strTags: mealOrDrink.strTags,
        strYoutube: null,
        strInstructions: mealOrDrink.strInstructions,
        image: mealOrDrink.strDrinkThumb,
        dateModified: mealOrDrink.dateModified,
        strGlass: mealOrDrink.strGlass,
        alcoholicOrNot: mealOrDrink.strAlcoholic,
        area: null,
        strIngredient1: mealOrDrink.strIngredient1,
        strIngredient2: mealOrDrink.strIngredient2,
        strIngredient3: mealOrDrink.strIngredient3,
        strIngredient4: mealOrDrink.strIngredient4,
        strIngredient5: mealOrDrink.strIngredient5,
        strIngredient6: mealOrDrink.strIngredient6,
        strIngredient7: mealOrDrink.strIngredient7,
        strIngredient8: mealOrDrink.strIngredient8,
        strIngredient9: mealOrDrink.strIngredient9,
        strIngredient10: mealOrDrink.strIngredient10,
        strIngredient11: mealOrDrink.strIngredient11,
        strIngredient12: mealOrDrink.strIngredient12,
        strIngredient13: mealOrDrink.strIngredient13,
        strIngredient14: mealOrDrink.strIngredient14,
        strIngredient15: mealOrDrink.strIngredient15,
        strMeasure1: mealOrDrink.strMeasure1,
        strMeasure2: mealOrDrink.strMeasure2,
        strMeasure3: mealOrDrink.strMeasure3,
        strMeasure4: mealOrDrink.strMeasure4,
        strMeasure5: mealOrDrink.strMeasure5,
        strMeasure6: mealOrDrink.strMeasure6,
        strMeasure7: mealOrDrink.strMeasure7,
        strMeasure8: mealOrDrink.strMeasure8,
        strMeasure9: mealOrDrink.strMeasure9,
        strMeasure10: mealOrDrink.strMeasure10,
        strMeasure11: mealOrDrink.strMeasure11,
        strMeasure12: mealOrDrink.strMeasure12,
        strMeasure13: mealOrDrink.strMeasure13,
        strMeasure14: mealOrDrink.strMeasure14,
        strMeasure15: mealOrDrink.strMeasure15,
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
          type: 'meal',
          id: mealOrDrink.idMeal,
          name: mealOrDrink.strMeal,
          image: mealOrDrink.strMealThumb,
        } : {
          type: 'drink',
          id: mealOrDrink.idDrink,
          name: mealOrDrink.strDrink,
          image: mealOrDrink.strDrinkThumb,
        }
    )));

export const resumeMealAndDrinkRecipe = ({
  type,
  id,
  name,
  image,
  category,
  alcoholicOrNot,
  area,
}) => (
  {
    type,
    id,
    name,
    image,
    category,
    alcoholicOrNot,
    area,
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
