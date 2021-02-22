import React, { useState } from 'react';
import { Header, Button, HorizontalCard } from '../components';

export default function DoneRecipes() {
  const [filter, setFilters] = useState(null);
  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
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
      </div>
      <HorizontalCard filter={ filter } />
    </div>
  );
}
