import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as drinkApiFunctions from '../services/drinkApiFunctions';
import ExploreFoodIngredientCards from '../components/ExploreFoodIngredientCards';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

function ExplorerDrinksIngredients(props) {
  const { location } = props;
  const { pathname } = location;
  const [allIngredientsToRender, setAllIngredientsToRender] = useState([]);
  useEffect(() => {
    drinkApiFunctions
      .fetchAllDrinkIngredients()
      .then((response) => setAllIngredientsToRender(response.drinks));
  }, []);

  const renderTwelveElements = (array, path) => {
    // if (array === null) {
    //   return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    // }
    // if (array.length === 1) {
    //   return <Redirect to={ `/comidas/${array[0].idMeal}` } />;
    // }
    // const eleven = 11;
    const initialarray = [...array];
    initialarray.length = 12;
    const finalArray = initialarray
      .map((ingredient, index) => (
        <ExploreFoodIngredientCards
          title={ ingredient.strIngredient1 }
          key={ index }
          index={ index }
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

ExplorerDrinksIngredients.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.bool,
  }).isRequired,
};

export default ExplorerDrinksIngredients;
