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
          id: idMeal,
          type: strTags,
          area: strArea,
          category: strCategory,
          name: strMeal,
          image: strMealThumb,
          alcoholicOrNot: strDrinkAlternate,
        };
        localStorage.setItem('favoriteRecipes', JSON.stringify(read));
      }
      return obj.idMeal === idMeal;
    });

    if (!checkoutStorage) {
      const newArray = [
        ...read,
        {
          id: idMeal,
          type: strTags,
          area: strArea,
          category: strCategory,
          name: strMeal,
          image: strMealThumb,
          alcoholicOrNot: strDrinkAlternate,
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
