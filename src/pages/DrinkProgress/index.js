import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ProgressDrink from '../../Components/ProgressDrink';
import RequestDrinkById from '../../services/drinkByIdApi';
import { DrinkContext } from '../../providers/DrinkProvider';

const FoodProgress = ({ match: { params: { id } } }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const { data } = useContext(DrinkContext);
  const maxLength = 6;
  const recommend = data.filter((recipe, index) => index < maxLength);

  useEffect(() => {
    const fetchRecipe = async () => setCurrentRecipe(...await RequestDrinkById(id));
    fetchRecipe();
  }, [id]);

  const initialCut = 21;
  const initialMeasureCut = 29;
  const endCut = 14;
  const ingredientes = currentRecipe && Object.values(currentRecipe)
    .splice(initialCut, endCut)
    .filter((item) => item);
  const medidas = currentRecipe && Object.values(currentRecipe)
    .splice(initialMeasureCut, endCut)
    .filter((item) => item !== ' ' && item !== null);

  return (
    <div>
      <ProgressDrink
        id={ id }
        type="bebidas"
        recipe={ currentRecipe }
        recommend={ recommend }
        ingredientes={ ingredientes }
        medidas={ medidas }
      />
    </div>
  );
};

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodProgress;
