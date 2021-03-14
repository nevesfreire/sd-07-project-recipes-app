import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
// import { fetchApi, allFood, allDrink } from '../services/fetchApi';
// import siteMap from '../helpers/siteMap';
import HCard from './HCard';

const filter = (text, setRecipeFilter) => (
  <Button
    type="button"
    variant="contained"
    className=""
    data-testid={ `filter-by-${text}-btn` }
    onClick={ () => {
      setRecipeFilter(text === 'all' ? 'all' : text);
    } }
  >
    {text}
  </Button>
);

const RecipeList = () => {
  const [cards, setCards] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState('all');
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    console.log(recipeFilter);
    if (pathname.match('receitas-feitas')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes) {
        setCards(doneRecipes);
      }
    }
    if (pathname.match('receitas-favoritas')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        setCards(favoriteRecipes);
      }
    }
  }, [recipeFilter]);

  useEffect(() => {
  //   const doneRecipes = [
  //     {
  //       id: '52771',
  //       type: 'comida',
  //       area: 'Italian',
  //       category: 'Vegetarian',
  //       alcoholicOrNot: '',
  //       name: 'Spicy Arrabiata Penne',
  //       image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //       doneDate: '23/06/2020',
  //       tags: ['Pasta', 'Curry'],
  //     },
  //     {
  //       id: '178319',
  //       type: 'bebida',
  //       area: '',
  //       category: 'Cocktail',
  //       alcoholicOrNot:  'Alcoholic',
  //       name: 'Aquamarine',
  //       image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //       doneDate: '23/06/2020',
  //       tags: [],
  //     },
  //   ];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot:  'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, []);

  if (!cards) return <div>Loading...</div>;
  console.log('cardsList', cards);

  return (
    <div>
      {filter('all', setRecipeFilter)}
      {filter('food', setRecipeFilter)}
      {filter('drink', setRecipeFilter)}
      {
        cards
          .filter((_recipe) => {
            if (recipeFilter === 'food') return _recipe.type === 'comida';
            if (recipeFilter === 'drink') return _recipe.type === 'bebida';
            return _recipe;
          })
          .map((recipe, index) => (
            <HCard
              key={ recipe.id }
              id={ recipe.id }
              Type={ recipe.type }
              Area={ recipe.area }
              Category={ recipe.category }
              Alcoholic={ recipe.alcoholicOrNot }
              Name={ recipe.name }
              Thumb={ recipe.image }
              Index={ index }
              DoneDate={ pathname.match('receitas-feitas') && recipe.doneDate.toString() }
              Tags={ pathname.match('receitas-feitas') && recipe.tags }
              Test="horizontal"
            />
          ))
      }
    </div>
  );
};

export default RecipeList;
