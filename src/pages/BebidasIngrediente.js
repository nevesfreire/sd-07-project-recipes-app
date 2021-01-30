import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinksIngredients } from '../services/api';

export default function BebidasIngrediente() {
  const {
    isFetching,
    cards,
    setCards,
    setIsFetching,
  } = useContext(RecipesContext);

  const history = useHistory();

  const getDrinksIngredients = async () => {
    setCards(await fetchDrinksIngredients());
    setIsFetching(false);
  };

  useEffect(() => {
    getDrinksIngredients();
  }, []);

  console.log(cards);
  const zero = 0;
  const doze = 12;

  const handleDrinkIngrCard = () => {
    history.push('/bebidas');
  };

  if (isFetching) return <h5>Carregando...</h5>;
  return (
    <div>
      <Header />
      {!isFetching && cards.slice(zero, doze).map((drink, index) => (

        <Card
          key={ index }
          style={ { width: '18rem' } }
          data-testid={ `${index}-ingredient-card` }
          onClick={ handleDrinkIngrCard }
        >
          <Card.Img
            variant="top"
            src={ drink && `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title
              data-testid={ `${index}-card-name` }
            >
              { `${drink.strIngredient1}` }
            </Card.Title>
          </Card.Body>
        </Card>

      ))}
    </div>
  );
}
