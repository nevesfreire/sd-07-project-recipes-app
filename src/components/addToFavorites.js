export default function addToFavorites(itemId, mealType, details) {
  const zero = 0;
  const data = {
    id: itemId,
    type: mealType,
    area: mealType === 'Meal' ? details.strArea : '',
    category: details.strCategory,
    alcoholicOrNot: mealType === 'bebida' ? details.strAlcoholic : '',
    name: details[`str${mealType}`],
    image: details[`str${mealType}Thumb`],
  };
  let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favList) {
    if (favList.filter((item) => item.id === itemId).length > zero) {
      favList = favList.filter((item) => item.id !== itemId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favList, data]));
    }
  } else {
    setIsFavorite(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify([data]));
  }
}
