import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useInProgressRecipe() {
  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')),
  );
  const [ingredientCount, setIngredientCount] = useState([]);
  const [disable, setDisable] = useState(true);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const removeIngredient = (type, id, ingredient) => {
    if (inProgressRecipes) {
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
      setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  const addIngredient = (type, id, ingredient) => {
    if (inProgressRecipes) {
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
      setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  const buttonToDisable = (ids, type, setIngred) => {
    setIngredientCount(setIngred);
    let ingredientStorage = [];
    const inIngrendits = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inIngrendits) {
      const { meals } = inIngrendits;
      const { cocktails } = inIngrendits;

      if (type === 'comidas') {
        ingredientStorage = meals[ids] ? meals[ids].length : [];
      } else {
        ingredientStorage = cocktails[ids] ? cocktails[ids].length : [];
      }
      if (ingredientCount === ingredientStorage) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  };

  const handleChange = ({ target }, id, type, setIngred) => {
    const { name, checked } = target;
    if (checked) {
      addIngredient(type, id, name);
    } else {
      removeIngredient(type, id, name);
    }
    buttonToDisable(id, type, setIngred);
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
      if (strTags !== null) tags = [...tags, ...strTags.split(',')];

      localStorage.setItem('doneRecipes', JSON.stringify([
        ...doneRecipes,
        {
          id,
          type: 'comida',
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
      if (strTags !== null) tags = [...tags, ...strTags.split(',')];
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...doneRecipes,
        {
          id,
          type: 'bebida',
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

  /*   useEffect(() => {
    setInitialLocalStorage();
  }, []); */

  return [handleClick, disable, setIngredientCount,
    inProgressRecipes, buttonToDisable, handleChange];
}

export default useInProgressRecipe;
