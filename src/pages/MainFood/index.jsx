import React, { useEffect, useContext, useState } from 'react';
import { RecipesContext } from '../../context';
import { Header, Footer, RecipeCard, Category } from '../../components';
import './MainFood.css';

export default function MainFood() {
  const { setMeals, meals } = useContext(RecipesContext);
  const twelve = 12;
  const five = 5;
  const [categories, setCategories] = useState([]);

  const fetchRandomFoods = async () => {
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const foods = await fetch(URL).then((response) => response.json());
      setMeals(foods.meals);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFoodsCategories = async () => {
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const results = await fetch(URL).then((response) => response.json());
      setCategories(results.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ZERO = 0;
    if (meals.length === ZERO) {
      fetchRandomFoods();
    }
    fetchFoodsCategories();
  }, []);

  return (
    <div>
      <Header title="Comidas" />
      <div className="categories-buttons">
        <button
          type="button"
          onClick={ fetchRandomFoods }
          data-testid="All-category-filter"
        >
          ALL
        </button>
        {
          categories && categories.filter((_, index) => index < five)
            .map((category, index) => (
              <Category
                fetchRandomFoods={ fetchRandomFoods }
                key={ index }
                category={ category }
              />
            ))
        }
      </div>
      <main className="main-food">
        <div className="cards-container">
          {
            meals.filter((_, index) => index < twelve)
              .map((meal, index) => (
                <RecipeCard key={ index } id={ index } meal={ meal } />
              ))
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}
