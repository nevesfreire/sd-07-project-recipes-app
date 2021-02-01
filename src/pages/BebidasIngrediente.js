import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinksIngredients } from '../services/api';

export default function BebibasIngrediente() {
  const [ingrCards, setIngrCards] = useState([]);
  const [endpoint, setEndpoint] = useState('');

  const {
    isFetching,
    setIsFetching,
    setCards,
    filteredIngrCards,
    setFilteredIngrCards,
  } = useContext(RecipesContext);

  const history = useHistory();

  const zero = 0;
  const doze = 12;

  // Recebendo os cards de ingredientes

  const getDrinksIngredients = useCallback(async () => {
    const allCards = await fetchDrinksIngredients();
    const twelveCards = allCards.slice(zero, doze);
    setIngrCards(twelveCards);
    setIsFetching(false);
  }, [setIsFetching]);

  useEffect(() => {
    getDrinksIngredients();
  }, [getDrinksIngredients]);

  // Recebendo Cards do Ingrediente Escolhido

  console.log(filteredIngrCards);

  // Setando os cards com o ingrediente selecionado no estado global

  const handleClick = async ({ target }) => {
    setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${target.value}`);
    const { drinks } = await fetch(endpoint).then((response) => response.json());
    const twelveFilteredCards = drinks.slice(zero, doze);
    setFilteredIngrCards(twelveFilteredCards);
    setCards([]);
    history.push('/bebidas');
  };

  console.log(endpoint);

  if (isFetching) return <h5>Carregando...</h5>;
  return (

    <div>
      <Header />
      {ingrCards.map((drink, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          value={ drink.strIngredient1 }
          onClick={ (e) => handleClick(e) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            alt="ingrediente"
            value={ drink.strIngredient1 }
          />
          <h3 data-testid={ `${index}-card-name` }>
            { drink.strIngredient1 }
          </h3>
        </button>
      ))}
    </div>
  );
}
