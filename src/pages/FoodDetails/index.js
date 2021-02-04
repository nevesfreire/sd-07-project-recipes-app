import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Details from '../../Components/Details';
import RequestFoodById from '../../services/foodByIdApi';
import { DrinkContext } from '../../providers/DrinkProvider';

const FoodDetails = ({ match: { params: { id } } }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const { data } = useContext(DrinkContext);
  const maxLength = 6;
  const recommend = data.filter((recipe, index) => index < maxLength);

  useEffect(() => {
    const fetchRecipe = async () => setCurrentRecipe(...await RequestFoodById(id));
    fetchRecipe();
  }, [id]);

  const initialCut = 9;
  const initialMeasureCut = 29;
  const endCut = 20;
  const ingredientes = currentRecipe && Object.values(currentRecipe)
    .splice(initialCut, endCut)
    .filter((item) => item);
  const medidas = currentRecipe && Object.values(currentRecipe)
    .splice(initialMeasureCut, endCut)
    .filter((item) => item !== ' ');

  return (
    <div>
      <Details
        id={ id }
        type="comida"
        recipe={ currentRecipe }
        recommend={ recommend }
        ingredientes={ ingredientes }
        medidas={ medidas }
      />
    </div>
  );
};

export default FoodDetails;

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
