import React, { useState, useFetch } from 'react';
import PropTypes, { func } from 'prop-types';
import Card from '../components/Card';
import Header from '../components/Header';

function FavoritesRecipes({handleFilter}) {


  return (
    <div>
      <Header title="Receitas Favoritas" explore />
      <button type="button" onClick={ () => {handleFilter('all')} } data-testid="filter-by-all-btn">All</button>
      <button type="button" onClick={ () => {handleFilter('food')} } data-testid="filter-by-food-btn">Food</button>
      <button type="button" onClick={ () => {handleFilter('drinks')} } data-testid="filter-by-drink-btn">Drinks</button>
      <Card />
    </div>

  );
}

FavoritesRecipes.propTypes = {
  handleFilterAll: PropTypes.func.isRequired,

};

export default FavoritesRecipes;
