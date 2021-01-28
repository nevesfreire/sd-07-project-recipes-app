import React, { useContext, useEffect, useState } from 'react';
import { Header, Footer, RecipeCard, Category } from '../../components';
import { RecipesContext } from '../../context';

export default function MainDrink() {
  const {
    setDrinks,
    drinks,
  } = useContext(RecipesContext);
  const TWELVE = 12;
  const five = 5;
  const [categories, setCategories] = useState([]);

  const fetchDrinks = async () => {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL).then((results) => results.json());
      setDrinks(response.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDrinkCategories = async () => {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const results = await fetch(URL).then((response) => response.json());
      setCategories(results.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrinks();
    fetchDrinkCategories();
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      <main>
        <div>
          {
            categories && categories.filter((_, index) => index < five)
              .map((category, index) => <Category key={ index } category={ category } />)
          }
        </div>
        {
          drinks.filter((_, index) => index < TWELVE)
            .map((drink, index) => (
              <RecipeCard
                key={ index }
                id={ index }
                meal={ drink }
              />
            ))
        }
      </main>
      <Footer />
    </div>
  );
}
