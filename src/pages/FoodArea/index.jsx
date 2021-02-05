import React, { useEffect, useState, useContext } from 'react';
import { Header, Footer, RecipeCard } from '../../components';
import { RecipesContext } from '../../context';
import { fetchRandomFoods } from '../../services/mandaFoods';

export default function FoodArea() {
  const [mealsArea, setMealsArea] = useState([{ strArea: 'All' }]);
  const [mealsForArea, setMealsForArea] = useState([]);
  const { meals } = useContext(RecipesContext);
  const TWELVE = 12;

  const mealsAreaFetching = async () => {
    const endPointArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(endPointArea);
    const results = await response.json();
    setMealsArea([...mealsArea, ...results.meals]);
  };

  const fechtchingMeaalsForArea = async (selectedArea) => {
    const endPointMealsForArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    const response2 = await fetch(endPointMealsForArea);
    const results2 = await response2.json();
    setMealsForArea(results2.meals);
  };

  const initialFoods = async () => {
    const randomFoods = await fetchRandomFoods();
    console.log(randomFoods.meals);
    setMealsForArea(randomFoods.meals);
  };

  const areaSelectdOption = ({ target: { value } }) => {
    if (value === 'All') {
      console.log(meals);
      initialFoods();
    }
    fechtchingMeaalsForArea(value);
  };

  useEffect(() => {
    mealsAreaFetching();
    initialFoods();
  }, []);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ areaSelectdOption }
      >

        {
          mealsArea
            .map((area, index) => (
              <option
                key={ index }
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>
            ))
        }
      </select>
      {
        mealsForArea && mealsForArea.filter((_, index) => index < TWELVE)
          .map((meal, index) => (
            <RecipeCard
              key={ index }
              id={ index }
              meal={ meal }
            />
          ))
      }
      <Footer />
    </div>
  );
}
