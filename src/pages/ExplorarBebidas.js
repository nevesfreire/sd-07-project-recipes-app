import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function ExplorarBebidas() {
  const {
    handleDrinkSurpriseButton,
    handleDrinksIngredientsButton,
  } = useContext(RecipesContext);

  return (
    <div>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <Card
          data-testid="explore-by-ingredient"
          onClick={ handleDrinksIngredientsButton }
        >
          <Card.Title>Por Ingredientes</Card.Title>
        </Card>
      </Link>

      <Card
        data-testid="explore-surprise"
        onClick={ handleDrinkSurpriseButton }
      >
        <Card.Title>Me Surpreenda!</Card.Title>
      </Card>

      <Footer />
    </div>
  );
}
