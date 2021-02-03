const favoriteMealLocalStorage = (meal, favorite, keyStorage) => {
  const {
    idMeal,
    strArea,
    strCategory,
    strMeal,
    strMealThumb,
    strDrinkAlternate,
  } = meal;

  const read = JSON.parse(localStorage.getItem(keyStorage));

  if (favorite) {
    const checkoutStorage = read.some((obj, index) => {
      if (obj.id === idMeal) {
        const newArray = read;
        newArray[index] = {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          name: strMeal,
          image: strMealThumb,
          alcoholicOrNot: strDrinkAlternate === null ? '' : strDrinkAlternate,
        };
        localStorage.setItem(keyStorage, JSON.stringify(newArray));
      }
      return obj.id === idMeal;
    });

    if (checkoutStorage === false) {
      const newArray = [
        ...read,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          name: strMeal,
          image: strMealThumb,
          alcoholicOrNot: strDrinkAlternate === null ? '' : strDrinkAlternate,
        },
      ];
      localStorage.setItem(keyStorage, JSON.stringify(newArray));
    }
  } else {
    const newArray = read.filter((obj) => obj.id !== idMeal);
    localStorage.setItem(keyStorage, JSON.stringify(newArray));
  }
};

const favoriteDrinkLocalStorage = (drink, favorite, keyStorage) => {
  const {
    idDrink,
    strCategory,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
  } = drink;

  const read = JSON.parse(localStorage.getItem(keyStorage));

  if (favorite) {
    const checkoutStorage = read.some((obj, index) => {
      if (obj.id === idDrink) {
        const newArray = read;
        newArray[index] = {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          name: strDrink,
          image: strDrinkThumb,
          alcoholicOrNot: strAlcoholic === null ? '' : strAlcoholic,
        };
        localStorage.setItem(keyStorage, JSON.stringify(newArray));
      }
      return obj.id === idDrink;
    });

    if (checkoutStorage === false) {
      const newArray = [
        ...read,
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          name: strDrink,
          image: strDrinkThumb,
          alcoholicOrNot: strAlcoholic === null ? '' : strAlcoholic,
        },
      ];
      localStorage.setItem(keyStorage, JSON.stringify(newArray));
    }
  } else {
    const newArray = read.filter((obj) => obj.id !== idDrink);
    localStorage.setItem(keyStorage, JSON.stringify(newArray));
  }
};

export {
  favoriteMealLocalStorage,
  favoriteDrinkLocalStorage,
};
