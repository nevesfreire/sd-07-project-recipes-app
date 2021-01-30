import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchButton from '../components/SearchButton';

export default function Comidas() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCards = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const arr = [...data.meals];
    const initialIndex = 0;
    const finalIndex = 12;
    const splicedCards = arr.splice(initialIndex, finalIndex);
    setCards(splicedCards);
  };

  const getCategories = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const arr = [...data.meals];
    const initialIndex = 0;
    const finalIndex = 5;
    setCategories(arr.splice(initialIndex, finalIndex));
  }, [setCategories]);

  const filterByCategory = async ({ target }) => {
    if (target.id === 'unclicked') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const data = await response.json();
      const arr = [...data.meals];
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
    getCategories();
    getCards();
    console.log(categories);
  }, [getCategories]);

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
          type="button"
          key={ category.id }
          id="unclicked"
          data-testid={ `${category.strCategory}-category-filter` }
          value={ category.strCategory }
          onClick={ (event) => filterByCategory(event) }
        >
          {category.strCategory}
        </button>
      ))}
      {cards.map((card, index) => (
        <Link key={ card.id } to={ `/comidas/${card.idMeal}` }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ card.strMealThumb }
              alt="Thumb Comida"
            />
            <h1 data-testid={ `${index}-card-name` }>{card.strMeal}</h1>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}
