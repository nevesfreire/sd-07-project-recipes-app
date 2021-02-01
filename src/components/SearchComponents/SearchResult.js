import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function SearchResult() {
  const {
    isFetching,
    cards,
  } = useContext(RecipesContext);

  const history = useHistory();

  const path = history.location.pathname;

  // ParaComidas:

  if (path === '/comidas') {
    if (!isFetching && cards.length === 1) {
      return <Redirect to={ `/comidas/${cards[0].idMeal}` } />;
    }
    return (
      !isFetching && cards.map((meal, index) => (
        <Link key={ index } to={ `/comidas/${meal.idMeal}` }>
          <Card
            style={ { width: '18rem' } }
            data-testid={ `${index}-recipe-card` }
          >
            <Card.Img
              variant="top"
              src={ `${meal.strMealThumb}` }
              data-testid={ `${index}-card-img` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
              >
                { `${meal.strMeal}` }
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      ))
    );
  }

  // Para Bebidas:

  if (path === '/bebidas') {
    if (!isFetching && cards.length === 1) {
      return <Redirect to={ `/bebidas/${cards[0].idDrink}` } />;
    }
    return (
      !isFetching && cards.map((drink, index) => (
        <Link key={ index } to={ `/comidas/${drink.idDrink}` }>
          <Card
            style={ { width: '18rem' } }
            data-testid={ `${index}-recipe-card` }
          >
            <Card.Img
              variant="top"
              src={ `${drink.strDrinkThumb}` }
              data-testid={ `${index}-card-img` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
              >
                { `${drink.strDrink}` }
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      ))
    );
  }
}

export default SearchResult;
