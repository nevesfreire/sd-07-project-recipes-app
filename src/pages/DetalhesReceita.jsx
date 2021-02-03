import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestApiFoodDetails } from '../services/requestFood';

function DetalhesReceitas({ match: { params: { id } } }) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim

  const getIngredientsAndMeasure = () => {
    if (foodDetails.length) {
      const objectOfFoodDetails = foodDetails[0];
      const ingredientRegex = /strIngredient/i;
      const measureRegex = /strMeasure/i;
      const detailsEntries = Object.entries(objectOfFoodDetails);
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
    }
  };

  useEffect(() => {
    getIngredientsAndMeasure();
  }, [foodDetails]);

  const callMainApi = async () => {
    const apiResult = await requestApiFoodDetails(id);
    setFoodDetails(apiResult);
  };

  useEffect(() => {
    callMainApi();
  }, []);

  if (!foodDetails.length) return <span>Loading...</span>;

  return (
    <div>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        deta-testid="recipe-photo"
      />
    </div>
  );
}

DetalhesReceitas.propTypes = { id: PropTypes.number.isRequired };

export default DetalhesReceitas;
