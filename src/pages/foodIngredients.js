import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import { getIngredientsFoodList } from '../services/Api';
import ListCardsItens from '../components/ListCardsItens';

function FoodIngredients() {
  const [dataIngretient, setDataIngretient] = useState([]);
  const ZERO = 0;

  useEffect(() => {
    async function ingredientList() {
      setDataIngretient(await getIngredientsFoodList());
    }
    ingredientList();
  }, []);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </header>
      <div>
        {
          dataIngretient.length > ZERO ? ListCardsItens(dataIngretient) : 'Carregando...'
        }
      </div>
      <Footer />
    </div>
  );
}

export default FoodIngredients;
