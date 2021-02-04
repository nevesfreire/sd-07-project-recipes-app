import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import FavoriteHeart from '../components/FavoriteHeart';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import shareIcon from '../images/shareIcon.svg';
import { loadState, saveState } from '../services/localStorage';
import { requestApiFoodDetails } from '../services/requestFood';

const filteredIngredientsAndMeasures = (
  detailsEntries,
  filteredIngredients,
  filteredMeasures,
) => {
  const ingredientRegex = /strIngredient/i;
  const measureRegex = /strMeasure/i;

  detailsEntries.forEach((currentArray) => {
    if (currentArray[1] !== null) {
      if (ingredientRegex.test(currentArray[0]) && currentArray[1].trim() !== '') {
        filteredIngredients.push(currentArray[1]);
      }

      if (measureRegex.test(currentArray[0]) && currentArray[1].trim() !== '') {
        filteredMeasures.push(currentArray[1]);
      }
    }
  });
};

function ProcessoReceita({ match: { params: { id } } }) {
  const initialCountValue = 0;
  const [checkBoxArray, setCheckBoxArray] = useState([]);
  const [countCheck, setCountCheck] = useState(initialCountValue);

  const {
    ingredientsAndMeasures,
    setIngredientsAndMeasures,
    foodDetails,
    setFoodDetails,
    copyVisibility,
    setCopyVisibility,
  } = useContext(CoffeAndCodeContext);

  const doneRecipe = () => {
    const date = new Date();
    const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const tag = foodDetails.strTags ? foodDetails.strTags.split(',') : null;

    saveState('doneRecipes', [
      ...loadState('doneRecpies', []),
      {
        id,
        type: 'comida',
        area: foodDetails.strArea,
        category: foodDetails.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.strMeal,
        image: foodDetails.strMealThumb,
        doneDate: currentDate,
        tags: tag,
      },
    ]);
  };

  const callApi = async () => {
    const apiResult = await requestApiFoodDetails(id);
    setFoodDetails(apiResult[0]);
  };

  const getIngredientsAndMeasures = () => {
    const detailsEntries = Object.entries(foodDetails);
    const filteredIngredients = [];
    const filteredMeasures = [];
    const expectedArray = [];

    filteredIngredientsAndMeasures(detailsEntries, filteredIngredients, filteredMeasures);

    filteredMeasures.forEach((measure, index) => {
      expectedArray.push(`${filteredIngredients[index]} ${measure}`);
    });

    setIngredientsAndMeasures(expectedArray);
  };

  const handleChecked = (event, element) => {
    if (event.target.checked) {
      setCheckBoxArray([...checkBoxArray, element]);
      setCountCheck(countCheck + 1);
    } else {
      const removingChecked = checkBoxArray
        .filter((check) => check !== element);

      setCheckBoxArray(removingChecked);
      setCountCheck(countCheck + 1);
    }
  };

  const getInitialCheckBoxArray = () => {
    const emptyArray = [];
    const loadStorage = loadState('inProgressRecipes', { meals: { [id]: emptyArray } });
    const thereIsTheMealsKey = Object.keys(loadStorage)
      .some((key) => key === 'meals');
    const thereIsTheIdKey = Object.keys(loadStorage.meals)
      .some((key) => key === id);

    if (thereIsTheIdKey && thereIsTheMealsKey) setCheckBoxArray(loadStorage.meals[id]);
    // else setCheckBoxArray(emptyArray);
  };

  useEffect(() => {
    const loadStorage = loadState('inProgressRecipes', {});
    console.log('teste linha 115', loadStorage);
    saveState('inProgressRecipes', {
      ...loadStorage,
      meals: { ...loadStorage.meals, [id]: [...checkBoxArray] },
    });
  }, [checkBoxArray]);

  useEffect(() => {
    getIngredientsAndMeasures();
  }, [foodDetails]);

  useEffect(() => {
    callApi();
    getInitialCheckBoxArray();
  }, []);

  if (!foodDetails) return <span>Loading...</span>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ foodDetails.strMealThumb }
        alt="thumb"
      />
      <div>
        <span
          data-testid="recipe-title"
        >
          { foodDetails.strMeal }
        </span>
        <hr />
        <span
          data-testid="recipe-category"
        >
          { foodDetails.strCategory }
        </span>
      </div>
      <div>
        <CopyToClipboard text={ window.location.href }>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => setCopyVisibility('visible') }
          >
            <img src={ shareIcon } alt="Share icon" />
          </button>
        </CopyToClipboard>
        <FavoriteHeart id={ id } food />
        <small style={ { visibility: copyVisibility } }>Link copiado!</small>
      </div>
      <div>
        <p>Ingredients</p>
        <div>
          {
            ingredientsAndMeasures.map((ingredient, index) => {
              const checked = checkBoxArray.some((check) => check === ingredient);

              return (
                <label
                  htmlFor={ `${ingredient}-${index}` }
                  data-testid={ `${index}-ingredient-step` }
                  key={ `${ingredient}-${index}` }
                >
                  <input
                    type="checkbox"
                    name={ `${ingredient}-${index}` }
                    id={ `${ingredient}-${index}` }
                    checked={ checked }
                    onClick={ (event) => handleChecked(event, ingredient) }
                  />
                  { ingredient }
                </label>
              );
            })
          }
        </div>
        <p>Instructions</p>
        <div>
          <p data-testid="instructions">{ foodDetails.strInstructions }</p>
        </div>
      </div>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ ingredientsAndMeasures.length !== countCheck }
          onClick={ doneRecipe }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

ProcessoReceita.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProcessoReceita;
