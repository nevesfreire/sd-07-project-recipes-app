import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Details from '../../Components/Details';
import RequestDrinkById from '../../services/drinkByIdApi';
import FoodProvider from '../../providers/Context/Context';

const DrinkDetails = ({ match: { params: { id } } }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const { data } = useContext(FoodProvider);
  const maxLength = 6;
  const recommend = data.filter((recipe, index) => index < maxLength);

  useEffect(() => {
    const fetchRecipe = async () => setCurrentRecipe(...await RequestDrinkById(id));
    fetchRecipe();
  }, [id]);

  const startIndex = 21;
  const initialMeasureCut = 36;
  const endCut = 15;
  const ingredientes = currentRecipe && Object.values(currentRecipe)
    .splice(startIndex, endCut)
    .filter((item) => item);
  const medidas = currentRecipe && Object.values(currentRecipe)
    .splice(initialMeasureCut, endCut)
    .filter((item) => item);

  return (
    <div>
      <Details
        id={ id }
        type="bebida"
        recipe={ currentRecipe }
        recommend={ recommend }
        ingredientes={ ingredientes }
        medidas={ medidas }
      />
    </div>
  );
};

export default DrinkDetails;

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
