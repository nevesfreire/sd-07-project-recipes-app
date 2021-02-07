import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CardDeck } from 'react-bootstrap';
import { getItem, saveItem, initialize } from '../../services/localStorage';

import Header from '../../components/Header';
import FavoriteCard from './FavoriteCard';

function FavoriteRecipes({ history, search = false }) {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [isUpdate, setUptade] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const favoritesRecipesFromLocalStorage = getItem('favoriteRecipes');
    if (!favoritesRecipesFromLocalStorage) initialize();
    else setFavoritesRecipes(favoritesRecipesFromLocalStorage);
  }, []);

  useEffect(() => {
    if (isUpdate) {
      const favoritesRecipesFromLocalStorage = getItem('favoriteRecipes');
      setFavoritesRecipes(favoritesRecipesFromLocalStorage);
      setUptade(false);
    }
  }, [favoritesRecipes]);

  const filterByCondition = (event) => {
    const { value } = event.target;
    setFilterType(value);
  };

  const disfavorItem = (id) => {
    const favoriteRecipesFromLocalStorage = getItem('favoriteRecipes');
    const newFavoritesRecipe = favoriteRecipesFromLocalStorage
      .filter((recipe) => recipe.id !== id);
    setUptade(true);
    setFavoritesRecipes(newFavoritesRecipe);
    saveItem('favoriteRecipes', newFavoritesRecipe);
  };

  return (
    <>
      <Header history={ history } search={ search } />
      <div className="categories">
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ (e) => filterByCondition(e) }
        >
          Filter All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ (e) => filterByCondition(e) }
        >
          Filter by Food
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ (e) => filterByCondition(e) }
        >
          Filter by Drink
        </Button>
      </div>
      <CardDeck
        style={ {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          padding: '15px 30px',
        } }
      >
        {favoritesRecipes
          .filter((recipe) => (
            filterType !== 'all'
              ? recipe.type === filterType
              : favoritesRecipes))
          .map((data, index) => (
            <FavoriteCard
              key={ index + 1 }
              disfavorItem={ disfavorItem }
              data={ data }
              index={ index }
            />
          ))}
      </CardDeck>
    </>
  );
}

FavoriteRecipes.defaultProps = { search: false };

FavoriteRecipes.propTypes = {
  search: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
