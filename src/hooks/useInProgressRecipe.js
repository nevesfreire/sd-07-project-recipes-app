import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function useInProgressRecipe() {
  let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

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
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([]));
    }
  };

  const history = useHistory();

  const handleClick = (recipe, type) => {
    const data = new Date();
    const doneDate = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
    let tags = [];

    if (type === 'comidas') {
      const { meals: currMeal } = recipe;
      const alcoholicOrNot = '';
      const {
        idMeal: id,
        strArea: area,
        strCategory: category,
        strMeal: name,
        strMealThumb: image,
        strTags,
      } = currMeal[0];
      if (strTags !== null) tags = strTags;

      localStorage.setItem('doneRecipes', JSON.stringify([
        ...doneRecipes,
        {
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        },
      ]));
    } else {
      const { drinks } = recipe;
      const area = '';
      const {
        idDrink: id,
        strCategory: category,
        strAlcoholic: alcoholicOrNot,
        strDrink: name,
        strDrinkThumb: image,
        strTags,
      } = drinks[0];
      if (strTags !== null) tags = strTags;
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...doneRecipes,
        {
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        },
      ]));
    }
    history.push('/receitas-feitas');
  };

  useEffect(() => {
    setInitialLocalStorage();
  }, []);

  return [handleChange, inProgressRecipes, handleClick];
}

export default useInProgressRecipe;
