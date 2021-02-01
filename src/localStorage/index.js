const readFavoriteLocalStorage = (meal, favorite) => {
  const {
    idMeal,
    strArea,
    strCategory,
    strMeal,
    strMealThumb,
    strTags,
    strDrinkAlternate,
  } = meal;

  const read = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (favorite) {
    const checkoutStorage = read.some((obj, index) => {
      if (obj.idMeal === idMeal) {
        read[index] = {
          idMeal,
          strTags,
          strArea,
          strCategory,
          strDrinkAlternate,
          strMeal,
          strMealThumb,
        };
        localStorage.setItem('favoriteRecipes', JSON.stringify(read));
      }
      return obj.idMeal === idMeal;
    });

    if (!checkoutStorage) {
      const newArray = [
        ...read,
        {
          idMeal,
          strTags,
          strArea,
          strCategory,
          strDrinkAlternate,
          strMeal,
          strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    }
  } else {
    const newArray = read.filter((obj) => obj.idMeal !== idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  }
};

export default readFavoriteLocalStorage;
