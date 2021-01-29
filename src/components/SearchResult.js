import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchResult() {
  const {
    isFetching,
    cards,
    inputSearch,
    optionSearch,
    url,
  } = useContext(RecipesContext);

  if (optionSearch === 'letter' && inputSearch.length > 1) {
    return (
      alert('Sua busca deve conter somente 1 (um) caracter')
    );
  }

  if (!isFetching && !cards) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  // ParaComidas:

  if (url === 'http://localhost:3000/comidas') {
    if (!isFetching && cards.length === 1) {
      return <Redirect to={ `/comidas/${cards[0].idMeal}` } />;
    }
    return (
      !isFetching && cards.map((meal) => (
        <Card
          key={ meal.idMeal }
          style={ { width: '18rem' } }
          data-testid={ `${meal.idMeal}-ingredient-card` }
        >
          <Card.Img
            variant="top"
            src={ `${meal.strMealThumb}` }
            data-testid={ `${meal.idMeal}-card-img` }
          />
          <Card.Body>
            <Card.Title
              data-testid={ `${meal.idMeal}-card-name` }
            >
              { `${meal.strMeal}` }
            </Card.Title>
          </Card.Body>
        </Card>
      ))
    );
  }

  // Para Bebidas:

  if (url === 'http://localhost:3000/bebidas') {
    if (!isFetching && cards.length === 1) {
      return <Redirect to={ `/bebidas/${cards[0].idDrink}` } />;
    }
    return (
      !isFetching && cards.map((drink) => (
        <Card
          key={ drink.idDrink }
          style={ { width: '18rem' } }
          data-testid={ `${drink.idDrink}-ingredient-card` }
        >
          <Card.Img
            variant="top"
            src={ `${drink.strDrinkThumb}` }
            data-testid={ `${drink.idDrink}-card-img` }
          />
          <Card.Body>
            <Card.Title
              data-testid={ `${drink.idDrink}-card-name` }
            >
              { `${drink.strDrink}` }
            </Card.Title>
          </Card.Body>
        </Card>
      ))
    );
  }
}

export default SearchResult;
