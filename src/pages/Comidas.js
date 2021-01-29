import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchButton from '../components/SearchButton';

export default function Comidas() {
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    console.log(data.meals);
    const initialIndex = 0;
    const finalIndex = 12;
    setCards(data.meals.splice(initialIndex, finalIndex));
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <Header />
      <SearchButton />
      <SearchBar />
      {cards.map((card, index) => (
        <div key={ card.id } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ card.strMealThumb }
            alt="Thumb Comida"
          />
          <h1 data-testid={ `${index}-card-name` }>{card.strMeal}</h1>
        </div>
      ))}
      <Footer />
    </div>
  );
}
