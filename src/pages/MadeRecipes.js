import React from 'react';
import { useMadeRecipes } from '../hooks';
import { Header, Button, HorizontalCard } from '../components';

export default function MadeRecipes() {
  const [{ drinks, foods }, setFilters] = useMadeRecipes();

  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      <div>
        <Button
          testid="filter-by-all-btn"
          text="All"
          func={ () => { setFilters({ drink: false, food: false }); } }
        />
        <Button
          testid="filter-by-food-btn"
          text="Food"
          func={ () => { setFilters({ drink: true, food: false }); } }
        />
        <Button
          testid="filter-by-drink-btn"
          text="Drinks"
          func={ () => { setFilters({ drink: false, food: true }); } }
        />
      </div>
      {
        drinks
        && drinks.map((id, index) => (
          <HorizontalCard id={ id } key={ index } index={ index } />
        ))
      }
      {
        foods
        && foods.map((id, index) => (
          <HorizontalCard id={ id } key={ index } index={ index } drink={ false } />
        ))
      }
    </div>
  );
}
