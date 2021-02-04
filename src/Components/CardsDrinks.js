import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import './cards.css';

function CardsDrinks() {
  const { drinks, fetchDrinks } = useContext(RecipesContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchDrinks();
  }, []);

  useEffect(() => {
    if (drinks === undefined) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (drinks && drinks.length === 1) setRedirect(true);
  }, [drinks]);

  if (redirect) return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
  return (
    <div className="Container__Cards">
      { drinks && drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <a
          className="cards__results"
          key={ strDrink }
          href={ `/bebidas/${idDrink}` }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              width="200"
              alt="drink"
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default CardsDrinks;
