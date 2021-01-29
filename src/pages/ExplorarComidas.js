import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Explorar() {
  const {
    cards,
    handleMealSurpriseButton,
    isFetching,
    getMealSurprise,
  } = useContext(RecipesContext);

  useEffect(() => {
    getMealSurprise();
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explorar/comidas/ingredientes">
        <Card data-testid="explore-by-ingredient">
          <Card.Title>Por Ingredientes</Card.Title>
        </Card>
      </Link>

      <Link to="/explorar/comidas/area">
        <Card data-testid="explore-by-area">
          <Card.Title>Por Local de Origem</Card.Title>
        </Card>
      </Link>

      {!isFetching && cards.map((card, index) => (
        <Link key={ index } to={ `/comidas/${card.idMeal}` }>
          <Card
            data-testid="explore-surprise"
            onClick={ handleMealSurpriseButton }
          >
            <Card.Title>Me Surpreenda!</Card.Title>
          </Card>
        </Link>
      ))}
      <Footer />
    </div>
  );
}
