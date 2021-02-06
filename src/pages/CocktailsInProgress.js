import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCocktailById } from '../services/cocktailAPI';

function CocktailsInProgress() {
  const [recipeId, setRecipeId] = useState('');
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [tags, setTags] = useState('');
  const history = useHistory();

  useEffect(() => {
    const path = history.location.pathname;
    const position = 2;
    const numberToSplice = 1;
    const splitPath = path.split('/')
      .splice(position, numberToSplice).toString();
    setRecipeId(splitPath);
    getCocktailById(splitPath)
      .then((res) => {
        setTitle(res.drinks[0].strDrink);
        setSource(res.drinks[0].strDrinkThumb);
        setCategory(res.drinks[0].strAlcoholic);
        setArea(res.drinks[0].strCategory);
        setTags(res.drinks[0].Tags);
      });
  }, []);

  const finishRecipe = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const findId = done.find((recipe) => recipe.id === recipeId);
    const date = new Date();
    const finishedRecipe = {
      id: recipeId,
      type: 'bebida',
      area: '',
      category: area,
      alcoholicOrNot: category,
      name: title,
      image: source,
      doneDate: date,
      tags,
    };
    if (!done) {
      localStorage.setItem('doneRecipes', JSON.stringify([finishedRecipe]));
    } else if (!findId) {
      const newList = [...done, finishedRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newList));
    }
  };

  return (
    <div>
      <img data-testid="recipe-photo" alt="Foto" />
      <h1 data-testid="recipe-title">{ }</h1>
      <button data-testid="share-btn" type="button">A</button>
      <button data-testid="favorite-btn" type="button">B</button>
      <spam data-testid="recipe-category">Xablau</spam>
      <h4>Instructions</h4>
      <p data-testid="instructions">Xablau</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default CocktailsInProgress;
