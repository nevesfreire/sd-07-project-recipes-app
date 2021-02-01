import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../common/SearchBar';
import { AppContext } from '../../context/AppContext';

import CategoryPanel from '../../common/CategoryPanel';
import NavigationButton from '../../common/NavigationButton';

import './style.css';

const Bebidas = () => {
  const history = useHistory();
  const { drinksCategories, filteredDrinks, isUsingSearchBar } = useContext(AppContext);
  const goToDetails = (idMeal) => {
    history.push(`/bebidas/${idMeal}`);
  };

  if (filteredDrinks.drinks) {
    const zero = 0;
    const doze = 12;
    if (filteredDrinks.drinks.length === 1 && isUsingSearchBar) {
      history.push(
        `/bebidas/${filteredDrinks.drinks[0].idDrink}`,
      );
    }
    return (
      <div>
        <SearchBar />
        <CategoryPanel categoryType="drinks" categoryList={ drinksCategories } />
        {filteredDrinks.drinks.slice(zero, doze).map((e, i) => (
          <div
            className="drinkContainer"
            key={ e.idDrink }
            data-testid={ `${i}-card-name` }
          >
            <img data-testid={ `${i}-card-img` } src={ e.strDrinkThumb } alt="drink" />
            <h1>
              <NavigationButton
                testId={ `${i}-recipe-card` }
                goToDetails={ goToDetails }
                itemName={ e.strDrink }
                idMeal={ e.idDrink }
              />
            </h1>
          </div>))}
      </div>
    );
  }

  return (
    <h1>Faça uma pesquisa</h1>
  );
};

export default Bebidas;
