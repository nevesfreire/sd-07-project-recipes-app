import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../Footer';
import CardIngredients from './CardIngredients';
import getDrinks from '../../services/cockTailAPI';

export default function DrinkIngredients() {
  const [ingredients, setIngrediets] = useState('');
  const zero = 0;
  const twelve = 12;

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getDrinks('listIngredient', '');
      setIngrediets(response.drinks);
    }
    fetchIngredients();
  }, [setIngrediets]);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { (ingredients.length > zero)
        && ingredients.map((ingredient, index) => {
          if (index < twelve) {
            return (
              <CardIngredients
                index={ index }
                name={ ingredient.strIngredient1 }
                key={ index }
                isMeal={ false }
              />
            );
          }
          return null;
        })}
      <Footer />
    </div>
  );
}
