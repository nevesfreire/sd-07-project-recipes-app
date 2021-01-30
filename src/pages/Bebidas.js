import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchButton from '../components/SearchButton';

export default function Bebidas() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCards = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const arr = data.drinks.slice();
    const initialIndex = 0;
    const finalIndex = 12;
    const splicedCards = arr.splice(initialIndex, finalIndex);
    setCards(splicedCards);
  };

  const getCategories = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const arr = [...data.drinks];
    const initialIndex = 0;
    const finalIndex = 5;
    setCategories(arr.splice(initialIndex, finalIndex));
  };

  const filterByCategory = async ({ target }) => {
    if (target.id === 'unclicked') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const data = await response.json();
      const arr = [...data.drinks];
      const initialIndex = 0;
      const finalIndex = 12;
      const filteredCards = arr.splice(initialIndex, finalIndex);
      setCards(filteredCards);
      target.id = 'clicked';
    } else {
      getCards();
      target.id = 'unclicked';
    }
  };

  useEffect(() => {
    getCards();
    getCategories();
  }, []);

  return (
    <div>
      <Header />
      <SearchButton />
      <SearchBar />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => getCards() }
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={ category.id }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          id="unclicked"
          value={ category.strCategory }
          onClick={ (event) => filterByCategory(event) }
        >
          {category.strCategory}
        </button>
      ))}
      {cards.map((card, index) => (
        <Link key={ card.id } to={ `/bebidas/${card.idDrink}` }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ card.strDrinkThumb }
              alt="Thumb Bebida"
            />
            <h1 data-testid={ `${index}-card-name` }>{card.strDrink}</h1>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}
