import React, { useMemo } from 'react';
import { Header, Button, HorizontalCard, NotFound } from '../components';
import { useLocalStorage } from '../hooks';

const getLists = (recipesInProgress) => {
  const defaultRecipes = { cocktails: [], meals: [] };
  const recipes = recipesInProgress || defaultRecipes;

  const cocktailList = recipes.cocktails || [];
  const cocktails = Object.keys(cocktailList);

  const mealsList = recipes.meals || [];
  const meals = Object.keys(mealsList);

  return [cocktails, meals];
};

export default function MadeRecipes() {
  const [recipesInProgress] = useLocalStorage('inProgressRecipes');
  const [drinks, foods] = useMemo(() => getLists(recipesInProgress), [recipesInProgress]);

  if (!recipesInProgress) return (<NotFound />);

  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      <div>
        <Button
          testid="filter-by-all-btn"
          text="All"
          func={ () => {} }
        />
        <Button
          testid="filter-by-food-btn"
          text="Food"
          func={ () => {} }
        />
        <Button
          testid="filter-by-drink-btn"
          text="Drinks"
          func={ () => {} }
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
