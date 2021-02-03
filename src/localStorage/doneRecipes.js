const date = () => {
  let day = new Date().getDay();
  if (day.toString().length === 1) day = `0${day}`;
  let month = new Date().getMonth();
  if (month.toString().length === 1) month = `0${month}`;
  let year = new Date().getFullYear();
  if (year.toString().length === 1) year = `0${year}`;
  return `${day}/${month}/${year}`;
};
// console.log(date());

const doneMealLocalStorage = (meal, favorite, keyStorage) => {
  const {
    idMeal,
    strArea,
    strCategory,
    strDrinkAlternate,
    strMeal,
    strMealThumb,
    strTags,
  } = meal;
  // id, type, area, category, alcoholicOrNot, name, image, doneDate, tags
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
          alcoholicOrNot: strDrinkAlternate === null ? '' : strDrinkAlternate,
          name: strMeal,
          image: strMealThumb,
          doneDate: date(),
          tags: strTags,
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
          alcoholicOrNot: strDrinkAlternate === null ? '' : strDrinkAlternate,
          name: strMeal,
          image: strMealThumb,
          doneDate: date(),
          tags: strTags,
        },
      ];
      localStorage.setItem(keyStorage, JSON.stringify(newArray));
    }
  } else {
    const newArray = read.filter((obj) => obj.id !== idMeal);
    localStorage.setItem(keyStorage, JSON.stringify(newArray));
  }
};

const doneDrinkLocalStorage = (drink, favorite, keyStorage) => {
  const {
    idDrink,
    strCategory,
    strAlcoholic,
    strDrink,
    strDrinkThumb,
    strTags,
  } = drink;
  // id, type, area, category, alcoholicOrNot, name, image, doneDate, tags
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
          alcoholicOrNot: strAlcoholic === null ? '' : strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
          doneDate: date(),
          tags: strTags,
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
          alcoholicOrNot: strAlcoholic === null ? '' : strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
          doneDate: date(),
          tags: strTags,
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
  doneMealLocalStorage,
  doneDrinkLocalStorage,
};
