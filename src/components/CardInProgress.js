import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { fetchDrinkDetailsById, fetchFoodDetailsById } from '../services/API';

import { getIngredients,
  checkOut,
  copyLink,
  addToFavorites,
  enableButton } from '../services/service';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import checksUnited from './checksUnited';

function CardInProgress() {
  const history = useHistory();
  const matchObject = useRouteMatch();
  const itemId = matchObject.params.id;
  const mealType = matchObject.path === '/comidas/:id/in-progress' ? 'Meal' : 'Drink';
  const mealTypeChain = mealType === 'Meal' ? 'meals' : 'cocktails';

  const [details, setDetails] = useState({});
  const [showMessage, setShowMessage] = useState('hidden');
  const [isFavorite, setIsFavorite] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [ingredientState, setIngredientState] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);

  const RedirectToDone = () => {
    history.push('/receitas-feitas');
  };

  useEffect(() => {
    const loadIngredients = () => {
      setIngredientState(getIngredients(details));
    };
    const checkedIngredients = async () => {
      const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (list) {
        const ingredients = list[mealTypeChain][itemId];
        setIngredientsList(ingredients);
      }
    };

    loadIngredients();
    checkedIngredients();
    checksUnited(itemId, undefined, setIsFavorite);
  }, [itemId, mealType, details, mealTypeChain]);

  useEffect(() => {
    const getDetails = async () => {
      let fromFetch = [];
      fromFetch = mealType === 'Drink'
        ? await fetchDrinkDetailsById(itemId)
        : await fetchFoodDetailsById(itemId);
      if (fromFetch) setDetails(fromFetch[0]);
    };
    getDetails();
  }, [itemId, mealType]);

  const loadIngredients = () => (
    <ul>
      {getIngredients(details).map((item, index) => (
        <li
          key={ `ìngredient${index}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ `${item.ingredient}` }>
            <input
              type="checkbox"
              value={ `${item.ingredient}` }
              onChange={ (event) => {
                checkOut(event.target.value, mealTypeChain, itemId);
                enableButton(setDisableButton, ingredientState, mealTypeChain, itemId);
                setIngredientsList([...ingredientsList, `${item.ingredient}`]);
              } }
              { ...console.log(ingredientsList.includes(`${item.ingredient}`)) }
              checked={ ingredientsList.includes(`${item.ingredient}`) }
            />
            <img
              width="30px"
              src={ `https://www.themealdb.com/images/ingredients/${item.ingredient}.png` }
              alt="ingredient"
            />
            {item.measure}
            {' '}
            -
            {' '}
            {item.ingredient}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <img
        alt="Meal Thumbnail"
        width="100%"
        data-testid="recipe-photo"
        src={ details[`str${mealType}Thumb`] }
        tagName="img"
      />
      <h3 data-testid="recipe-title">{details[`str${mealType}`]}</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyLink(window.location.href, setShowMessage) }
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => addToFavorites(itemId, mealType, details, setIsFavorite) }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        tabIndex="0"
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="heartIcon"
        />
        Favoritar
      </button>
      <h5 hidden={ showMessage }>Link copiado!</h5>
      <h4 width="90%" data-testid="recipe-category">
        {
          mealType === 'Meal'
            ? details.strCategory
            : details.strAlcoholic
        }
      </h4>
      {loadIngredients()}
      <p width="90%" data-testid="instructions">{details.strInstructions}</p>
      <button
        className="button-begin"
        type="button"
        width="100%"
        data-testid="finish-recipe-btn"
        disabled={ disableButton }
        onClick={ () => RedirectToDone() }
      >
        Finish
      </button>

    </div>
  );
}

export default CardInProgress;
