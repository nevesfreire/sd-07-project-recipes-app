import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function ExplorarBebidas() {
  const {
    cards,
    handleDrinkSurpriseButton,
    isFetching,
    getDrinkSurprise,
  } = useContext(RecipesContext);

  useEffect(() => {
    getDrinkSurprise();
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <Card data-testid="explore-by-ingredient">
          <Card.Title>Por Ingredientes</Card.Title>
        </Card>
      </Link>

      {!isFetching && cards.map((card, index) => (
        <Link key={ index } to={ `/bebidas/${card.idDrink}` }>
          <Card
            data-testid="explore-surprise"
            onClick={ handleDrinkSurpriseButton }
          >
            <Card.Title>Me Surpreenda!</Card.Title>
          </Card>
        </Link>
      ))}

      <Footer />
    </div>
  );
}
