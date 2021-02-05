import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getMealById } from '../services/mealAPI';

function MealsInProgress() {
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
    getMealById(splitPath)
      .then((res) => {
        setTitle(res.meals[0].strMeal);
        setSource(res.meals[0].strMealThumb);
        setCategory(res.meals[0].strCategory);
        setArea(res.meals[0].strArea);
        setTags(res.meals[0].Tags);
      });
  }, []);

  const finishRecipe = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const findId = done.find((recipe) => recipe.id === recipeId);
    const date = new Date();
    const finishedRecipe = {
      id: recipeId,
      type: 'comida',
      area,
      category,
      alcoholicOrNot: '',
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

export default MealsInProgress;
