import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getDrinkId } from '../services/Api';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getArrayIngredients from '../helpers/getArrayIngredients';

function DrinkProgress() {
  const [arrayDrink, setArrayDrink] = useState();
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const idPathName = useHistory().location.pathname.split('/');
  const idDrink = idPathName[2];
  const { push } = useHistory();

  useEffect(() => {
    const getArrayDrink = async () => {
      setArrayDrink(await getDrinkId(idPathName[2]));
    };
    getArrayDrink();
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
      const objDrinkIngredients = {
        ...inProgressRecipes,
        cocktails: { ...inProgressRecipes.cocktails,
          [idDrink]: [...inProgressRecipes.cocktails[idDrink], name] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objDrinkIngredients));
    } else {
      const objDrinkIngredients = {
        cocktails: { [idDrink]: [name] },
        meals: { },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(objDrinkIngredients));
    }
  };

  const favoriteRecipe = () => {
    const recipeFavorited = [{
      id: arrayDrink[0].idDrink,
      type: 'bebida',
      area: '',
      category: arrayDrink[0].strCategory,
      alcoholicOrNot: arrayDrink[0].strAlcoholic,
      name: arrayDrink[0].strDrink,
      image: arrayDrink[0].strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeFavorited));
    return getFavorited();
  };

  const shareClicker = () => {
    setCopied(true);
    return copy(`http://localhost:3000/bebidas/${idPathName[2]}`);
  };

  const handleChangeInput = ({ name }) => {
    saveLocalStorage(name);
  };
  const getRender = () => {
    const arrayIngredients = getArrayIngredients(arrayDrink);
    return (
      <div>
        <img
          style={ { width: '30%' } }
          src={ arrayDrink[0].strDrinkThumb }
          alt={ arrayDrink[0].strDrink }
          data-testid="recipe-photo"
        />
        <h3 data-testid="recipe-title">{arrayDrink[0].strDrink}</h3>
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
            src={ favorited ? whiteHeartIcon : blackHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
            id="favoriteBtn"
            onClick={ () => favoriteRecipe() }
          />
        </label>

        <p data-testid="recipe-category">{arrayDrink[0].strCategory}</p>
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
          {arrayDrink[0].strInstructions}
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
        arrayDrink ? getRender() : 'Loading...'
      }
    </div>
  );
}

export default DrinkProgress;
