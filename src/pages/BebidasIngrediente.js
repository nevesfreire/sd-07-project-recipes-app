import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function BebidasIngredientes() {
  const {
    isFetching,
    cards,
  } = useContext(RecipesContext);

  const zero = 0;
  const doze = 12;

  if (isFetching) return <h5>Carregando...</h5>;
  return (
    <div>
      <Header />
      {!isFetching && cards.slice(zero, doze).map((drink, index) => (
        <Link to="/comidas" key={ index }>
          <Card
            style={ { width: '18rem' } }
            data-testid={ `${index}-ingredient-card` }
          >
            <Card.Img
              variant="top"
              src={ drink && `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-small.png` }
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
        </Link>
      ))}
    </div>
  );
}
