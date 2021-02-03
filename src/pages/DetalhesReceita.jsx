import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestApiFoodDetails } from '../services/requestFood';

function DetalhesReceitas({ match: { params: { id } } }) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [videoLink, setVideoLink] = useState('');

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim

  const getIngredientsAndMeasure = () => {
    const ingredientRegex = /strIngredient/i;
    const measureRegex = /strMeasure/i;
    const detailsEntries = Object.entries(foodDetails);
    const filteredIngredients = [];
    const filteredMeasure = [];
    const expectedArray = [];

    detailsEntries.forEach((currentArray) => {
      if (ingredientRegex.test(currentArray[0]) && currentArray[1].trim() !== '')
      filteredIngredients.push(currentArray[1]);

      if (measureRegex.test(currentArray[0]) && currentArray[1].trim() !== '')
      filteredMeasure.push(currentArray[1]);
    });

    filteredMeasure.forEach((measure, index) => {
      expectedArray.push(`${filteredIngredients[index]} ${measure}`);
    });

    setIngredientsAndMeasure(expectedArray);
  };

  const getVideoLink = () => {
    if ( foodDetails.strYoutube ) {
      const splitLink = foodDetails.strYoutube.split('=');
      const endOfLink = splitLink[splitLink.length - 1];
      const expectedLink = `https://www.youtube.com/embed/${endOfLink}`;
      setVideoLink(expectedLink);
    }
  };

  useEffect(() => {
    getIngredientsAndMeasure();
    getVideoLink();
  }, [foodDetails]);

  const callMainApi = async () => {
    const apiResult = await requestApiFoodDetails(id);
    setFoodDetails(apiResult[0]);
  };

  useEffect(() => {
    callMainApi();
  }, []);

  if (!foodDetails) return <span>Loading...</span>;

  return (
    <div>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        deta-testid="recipe-photo"
      />
      <div>
        <div>
          <h2 data-testid="recipe-title">
            { foodDetails.strMeal }
          </h2>
          <hr/>
          <span data-testid="recipe-category">
            { foodDetails.strCategory }
          </span>
        </div>
      </div>
      <div>
        <p>Ingredients</p>
        <div>
          {
            ingredientsAndMeasure.map((element, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `ingredient${index}` }
              >
                { element }
              </p>
            ))
          }
        </div>
        <p>Instructions</p>
        <div>
          <p data-testid="instructions">
            { foodDetails.strInstructions }
          </p>
        </div>
      </div>
      <iframe
        src={ videoLink }
        data-testid="video"
        title="video"
        width="100%"
        height="360"
        allow="accelerometer"
      />
    </div>
  );
}

DetalhesReceitas.propTypes = { id: PropTypes.number.isRequired };

export default DetalhesReceitas;
