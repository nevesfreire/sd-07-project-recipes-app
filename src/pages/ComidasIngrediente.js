import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsIngredients } from '../services/api';

export default function ComidasIngrediente() {
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

  const getMealsIngredients = useCallback(async () => {
    const allCards = await fetchMealsIngredients();
    const twelveCards = allCards.slice(zero, doze);
    setIngrCards(twelveCards);
    setIsFetching(false);
  }, [setIsFetching]);

  useEffect(() => {
    getMealsIngredients();
  }, [getMealsIngredients]);

  console.log(ingrCards);

  console.log(filteredIngrCards);

  // Setando os cards com o ingrediente selecionado no estado global

  const handleClick = async ({ target }) => {
    setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${target.value}`);
    const { meals } = await fetch(endpoint).then((response) => response.json());
    const twelveFilteredCards = meals.slice(zero, doze);
    setFilteredIngrCards(twelveFilteredCards);
    setCards([]);
    history.push('/comidas');
  };

  if (isFetching) return <h5>Carregando...</h5>;
  return (
    <div>
      <Header />
      {ingrCards.map((meal, index) => (
        <button
          type="button"
          key={ index }
          to="/comidas"
          data-testid={ `${index}-ingredient-card` }
          value={ meal.strIngredient }
          onClick={ (e) => handleClick(e) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
            alt="ingrediente"
            value={ meal.strIngredient }
          />
          <h3 data-testid={ `${index}-card-name` }>
            { meal.strIngredient }
          </h3>
        </button>
      ))}
      <Footer />
    </div>
  );
}
