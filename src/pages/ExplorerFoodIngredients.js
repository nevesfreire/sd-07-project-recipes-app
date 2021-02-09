import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as foodApiFunctions from '../services/foodApiFunctions';
import ExploreFoodIngredientCards from '../components/ExploreFoodIngredientCards';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

function ExplorerFoodIngredients(props) {
  const { location } = props;
  const { pathname } = location;
  const [allIngredientsToRender, setAllIngredientsToRender] = useState([]);
  useEffect(() => {
    foodApiFunctions
      .fetchAllFoodIngredients()
      .then((response) => setAllIngredientsToRender(response.meals));
  }, []);

  const renderTwelveElements = (array, path) => {
    const initialarray = [...array];
    initialarray.length = 12;
    const finalArray = initialarray
      .map((ingredient, index) => (
        <ExploreFoodIngredientCards
          title={ ingredient.strIngredient }
          key={ index }
          index={ index }
          id={ ingredient.idIngredient }
          path={ path }
        />
      ));
    return finalArray;
  };
  return (
    <div id="explorer-ingredients">
      <HeaderNoSearch title="Explorar Ingredientes" />
      {allIngredientsToRender === undefined ? (
        <p>Loading</p>
      ) : (
        <div id="ingredient-cards">
          {renderTwelveElements(allIngredientsToRender, pathname)}
        </div>
      )}
      <Footer />
    </div>
  );
}

ExplorerFoodIngredients.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.bool,
  }).isRequired,
};

export default ExplorerFoodIngredients;
