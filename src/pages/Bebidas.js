import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

export default function Bebidas() {
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const initialIndex = 0;
    const finalIndex = 12;
    setCards(data.drinks.splice(initialIndex, finalIndex));
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <Header />
      <SearchButton />
      {cards.map((card, index) => (
        <div key={ card.id } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ card.strDrinkThumb }
            alt="Thumb Bebida"
          />
          <h1 data-testid={ `${index}-card-name` }>{card.strDrink}</h1>
        </div>
      ))}
      <Footer />
    </div>
  );
}
