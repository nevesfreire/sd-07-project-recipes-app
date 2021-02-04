import React, { useEffect, useState } from 'react';
import { RecipeCardList } from '../../components';
import { getAreas, getRecipes, getRecipesByArea } from '../../services/recipeAPI';

const RecipeExploreArea = () => {
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const START_INDEX = 0;
  const END_INDEX = 12;

  useEffect(() => {
    getAreas()
      .then((r) => setAreas(r));

    getRecipes('comidas')
      .then((r) => setRecipes(r));
  }, []);

  const handleSelect = () => {
    const dropdown = document.getElementById('area-dropdown');
    const selected = dropdown.options[dropdown.selectedIndex].value;
    if (selected === 'All') {
      getRecipes('comidas')
        .then((r) => setRecipes(r));
    } else {
      getRecipesByArea(selected)
        .then((r) => setRecipes(r));
    }
  };

  return (
    <div>
      <label htmlFor="area-dropdown">
        Locais:
        <select
          data-testid="explore-by-area-dropdown"
          id="area-dropdown"
          onChange={ () => handleSelect() }
        >
          <option value="All" data-testid="All-option">All</option>
          {areas.map((area, i) => (
            <option
              data-testid={ `${area.strArea}-option` }
              key={ i }
              value={ area.strArea }
            >
              {' '}
              {area.strArea}
            </option>))}

        </select>
      </label>
      <main>
        { recipes
        && <RecipeCardList recipeList={ recipes.slice(START_INDEX, END_INDEX) } /> }
      </main>
    </div>
  );
};

export default RecipeExploreArea;
