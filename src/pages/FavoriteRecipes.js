import React, { useEffect, useState } from 'react';
import { Header, Button, FavoriteCards } from '../components';
import { useFavoriteRecipes } from '../hooks';

export default function DoneRecipes() {
  const [filter, setFilters] = useState(null);
  const { favorites } = useFavoriteRecipes();
  const [recipes, setRecipes] = useState(favorites);

  useEffect(() => {
    const newRecipes = favorites
      .filter(({ type }) => type === filter || !filter);
    setRecipes(newRecipes);
  }, [filter, favorites]);

  return (
    <div>
      <Header title="Receitas Favoritas" search={ false } />
      <div>
        <Button
          testid="filter-by-all-btn"
          text="All"
          func={ () => { setFilters(); } }
        />
        <Button
          testid="filter-by-food-btn"
          text="Food"
          func={ () => { setFilters('comida'); } }
        />
        <Button
          testid="filter-by-drink-btn"
          text="Drinks"
          func={ () => { setFilters('bebida'); } }
        />
        <FavoriteCards recipes={ recipes } />
      </div>

    </div>
  );
}
