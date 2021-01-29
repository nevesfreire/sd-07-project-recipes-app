import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchAllFoodRecipes, fetchFoodDetailById } from '../services/foodApiFunctions';

function RecipesProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [id, setId] = useState(0);

  const randomId = async () => {
    const ids = [];
    const fetchIds = await fetchAllFoodRecipes();
    const { meals } = fetchIds;
    ids.push(meals.map((item) => item.idMeal));
    const randomNumber = Math.floor(Math.random() * ids[0].length);
    const newNumber = ids[0][randomNumber];
    console.log('numero', newNumber);
    setId(newNumber);
    const details = await fetchFoodDetailById(newNumber);
    console.log(details);
    setFoodDetail(details.meals[0]);
  };

  console.log(foodDetail);

  console.log(id);
  useEffect(() => {
    randomId();
  }, []);

  const context = {
    login,
    setLogin,
    foodDetail,
    setFoodDetail,
    drinkDetail,
    setDrinkDetail,
    id,
    setId,
  };

  return (
    <div>
      <RecipesContext.Provider value={ context }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RecipesProvider;
