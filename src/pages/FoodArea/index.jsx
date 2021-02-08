import React, { useEffect, useState, useContext } from 'react';
import { Header, Footer, RecipeCard, Loading } from '../../components';
import { RecipesContext } from '../../context';
import { fetchRandomFoods } from '../../services/mandaFoods';
import './FoodArea.css';

export default function FoodArea() {
  const [mealsArea, setMealsArea] = useState([{ strArea: 'All' }]);
  const [mealsForArea, setMealsForArea] = useState([]);
  const { meals, isLoading, setIsLoading } = useContext(RecipesContext);
  const TWELVE = 12;

  const mealsAreaFetching = async () => {
    setIsLoading(true);
    const endPointArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(endPointArea);
    const results = await response.json();
    setMealsArea([...mealsArea, ...results.meals]);
    setIsLoading(false);
  };

  const fechtchingMeaalsForArea = async (selectedArea) => {
    setIsLoading(true);
    const endPointMealsForArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    const response2 = await fetch(endPointMealsForArea);
    const results2 = await response2.json();
    setMealsForArea(results2.meals);
    setIsLoading(false);
  };

  const initialFoods = async () => {
    setIsLoading(true);
    const randomFoods = await fetchRandomFoods();
    console.log(randomFoods.meals);
    setMealsForArea(randomFoods.meals);
    setIsLoading(false);
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
    <div className="explore-area-container">
      <Header title="Explorar Origem" />
      <div className="explore-area-content">
        <select
          className="explore-dropdown"
          data-testid="explore-by-area-dropdown"
          onChange={ areaSelectdOption }
        >

          { isLoading ? <Loading />
            : mealsArea
              .map((area, index) => (
                <option
                  key={ index }
                  value={ area.strArea }
                  data-testid={ `${area.strArea}-option` }
                >
                  { area.strArea }
                </option>
              ))}
        </select>
        <div className="cards-container">
          { isLoading ? <Loading />
            : mealsForArea && mealsForArea.filter((_, index) => index < TWELVE)
              .map((meal, index) => (
                <RecipeCard
                  key={ index }
                  id={ index }
                  meal={ meal }
                />
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
