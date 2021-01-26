const mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
// areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list

export const mealsAPI = async () => {

  try {
    const response = await fetch(mealUrl);
    const dataMeal = await response.json();
    
    return dataMeal;
  } catch (error) {    
    return error.message;
  }

}

export const drinksAPI = async () => {

  try {
    const response = await fetch(drinkUrl);
    const dataDrink = await response.json();

    return dataDrink;
  } catch (error) {    
    return error.message;
  }

}
