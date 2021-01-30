import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RequestDrinkById from '../../services/drinkByIdApi';
import RequestFoodByName from '../../services/nameFoodApi';
import Details from '../../Components/Details';

const DrinkDetails = ({ match: { params: { id } } }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => setCurrentRecipe(...await RequestDrinkById(id));
    const fetchRecommd = async () => {
      const finalAPI = await RequestFoodByName('');
      const maxLength = 6;
      setRecommend(finalAPI.filter((recipe, index) => index < maxLength));
    };
    fetchRecipe();
    fetchRecommd();
  }, [id]);

  const startIndex = 21;
  const endCut = 5;
  const ingredientes = currentRecipe && Object.values(currentRecipe)
    .splice(startIndex, endCut)
    .filter((item) => item);

  return (
    <div>
      { recommend && <Details
        type="Bebidas"
        recipe={ currentRecipe }
        recommend={ recommend }
        ingredientes={ ingredientes }
      />}
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
