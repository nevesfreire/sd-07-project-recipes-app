const quinze = 15;
const zero = 0;
export const filteredList = (value, list) => list.filter((item) => item !== value);

export const getIngredients = (details) => {
  const ingredientsList = [];
  for (let i = 1; i <= quinze; i += 1) {
    if (details[`strIngredient${i}`]) {
      ingredientsList.push({
        ingredient: details[`strIngredient${i}`],
        measure: details[`strMeasure${i}`],
      });
    }
  }
  return ingredientsList;
};

export const checkOut = (checkedList, value) => {
  let isChecked = false;
  if (checkedList.length > zero) {
    isChecked = checkedList.some((item) => item === value);
  }
  localStorage.setItem('checkedList', isChecked
    ? filteredList(value, checkedList)
    : [...checkedList, value]);
  return (isChecked
    ? filteredList(value, checkedList)
    : [...checkedList, value]);
};
