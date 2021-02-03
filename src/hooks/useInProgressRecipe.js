import { useEffect } from 'react';

function useInProgressRecipe() {
  let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const removeIngredient = (type, id, ingredient) => {
    if (type === 'comidas') {
      const { meals } = inProgressRecipes;
      const ingredientExcluded = meals[id]
        .filter((ingredients) => ingredients !== ingredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: ingredientExcluded,
        },
      }));
    } else {
      const { cocktails } = inProgressRecipes;
      const ingredientExcluded = cocktails[id]
        .filter((ingredients) => ingredients !== ingredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [id]: ingredientExcluded,
        },
      }));
    }
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  };

  const addIngredient = (type, id, ingredient) => {
    if (type === 'comidas') {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: [...(inProgressRecipes.meals[id] || []), ingredient],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [id]: [...(inProgressRecipes.cocktails[id] || []), ingredient],
        },
      }));
    }
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  };

  const handleChange = ({ target }, id, type) => {
    const { name, checked } = target;
    if (checked) {
      addIngredient(type, id, name);
    } else {
      removeIngredient(type, id, name);
    }
  };

  const setInitialLocalStorage = () => {
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ meals: {}, cocktails: {} }));
    }
  };

  useEffect(() => {
    setInitialLocalStorage();
  }, []);

  return [handleChange];
}

export default useInProgressRecipe;
