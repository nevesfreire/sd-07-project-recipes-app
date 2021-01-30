import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RequestFoodById from '../../services/foodByIdApi';
import RequestDrinkByName from '../../services/nameDrinkApi';
import Details from '../../Components/Details';

const FoodDetails = ({ match: { params: { id } } }) => {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [recommend, setRecommend] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => setCurrentRecipe(...await RequestFoodById(id));
    const fetchRecommd = async () => {
      const finalAPI = await RequestDrinkByName('');
      const maxLength = 6;
      setRecommend(finalAPI.filter((recipe, index) => index < maxLength));
    };
    fetchRecipe();
    fetchRecommd();
  }, [id]);
  console.log(currentRecipe);
  const initialCut = 9;
  const endCut = 20;
  console.log(currentRecipe);
  const ingredientes = currentRecipe && Object.values(currentRecipe)
    .splice(initialCut, endCut)
    .filter((item) => item);

  return (
    <div>
      { recommend && <Details
        type="Comidas"
        recipe={ currentRecipe }
        recommend={ recommend }
        ingredientes={ ingredientes }
      />}
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
