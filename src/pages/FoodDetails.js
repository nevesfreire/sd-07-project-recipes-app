import React, { useContext, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import FoodAppContext from '../context/FoodAppContext';

function FoodDetails({ history }) {
  const {location: {pathname}}= history;
  const { handleClickDetail } = useContext(FoodAppContext);
  useEffect(() => {
    handleClickDetail(pathname.split('/'))
  }, [])
  return (
    <RecipeDetails />
  );
}
export default FoodDetails;
