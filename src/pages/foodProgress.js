import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getFoodId } from '../services/Api';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getArrayIngredients from '../helpers/getArrayIngredients';

function FoodProgress() {
  const [arrayFood, setArrayFood] = useState();
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const idPathName = useHistory().location.pathname.split('/');
  const idFood = idPathName[2];
  const { push } = useHistory();

  useEffect(() => {
    const getArrayFood = async () => {
      setArrayFood(await getFoodId(idPathName[2]));
    };
    getArrayFood();
  }, []);

  const getFavorited = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      return recipes[0].id === idPathName[2]
        ? setFavorited(!favorited)
        : setFavorited(false);
    } setFavorited(false);
  };

  const saveLocalStorage = (name) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      const objFoodIngredients = {
        ...inProgressRecipes,
        meals: { ...inProgressRecipes.meals,
          [idFood]: [...inProgressRecipes.meals[idFood], name] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objFoodIngredients));
    } else {
      const objFoodIngredients = {
        cocktails: { },
        meals: { [idFood]: [name] },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(objFoodIngredients));
    }
  };

  const favoriteRecipe = () => {
    const recipeFavorited = [{
      id: arrayFood[0].idMeal,
      type: 'comida',
      area: '',
      category: arrayFood[0].strCategory,
      name: arrayFood[0].strMeal,
      image: arrayFood[0].strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeFavorited));
    return getFavorited();
  };

  const shareClicker = () => {
    setCopied(true);
    return copy(`http://localhost:3000/comidas/${idPathName[2]}`);
  };

  const handleChangeInput = ({ name }) => {
    saveLocalStorage(name);
  };
  const getRender = () => {
    const arrayIngredients = getArrayIngredients(arrayFood);
    return (
      <div>
        <img
          style={ { width: '30%' } }
          src={ arrayFood[0].strMealThumb }
          alt={ arrayFood[0].strMeal }
          data-testid="recipe-photo"
        />
        <h3 data-testid="recipe-title">{arrayFood[0].strMeal}</h3>
        <label htmlFor="shareBtn">
          <input
            type="image"
            src={ shareIcon }
            alt="share icon"
            data-testid="share-btn"
            id="shareBtn"
            onClick={ () => shareClicker() }
          />
        </label>

        {copied && <h3>Link copiado!</h3>}

        <label htmlFor="favoriteBtn">
          <input
            type="image"
            src={ favorited ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
            id="favoriteBtn"
            onClick={ () => favoriteRecipe() }
          />
        </label>

        <p data-testid="recipe-category">{arrayFood[0].strCategory}</p>
        {
          arrayIngredients.map((ingredient, index) => (
            <div key="ingredient" data-testid={ `${index}-ingredient-step` }>
              <input
                checked
                type="checkbox"
                name={ ingredient }
                onChange={ (event) => (handleChangeInput(event.target)) }
              />
              <label htmlFor={ ingredient }>{ingredient}</label>
            </div>))
        }
        <textarea data-testid="instructions">
          {arrayFood[0].strInstructions}
        </textarea>

        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => push('/receitas-feitas') }
        >
          Finalizar Receita
        </button>
      </div>
    );
  };

  return (
    <div>
      {
        arrayFood ? getRender() : 'Loading...'
      }
    </div>
  );
}

export default FoodProgress;
