<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCocktailById } from '../services/cocktailAPI';
import ButtonsDetailsPage from '../components/ButtonsDetailsPage';
import { handleClickCocktails } from '../functions/DetailPages';

function CocktailsInProgress() {
  const history = useHistory();
  const [recipeId, setRecipeId] = useState('');
  const [storeIngredients, setStoreIngredients] = useState([]);
  const [storeMeasures, setStoreMeasures] = useState([]);
  const [ingredMeasures, setIngredMeasures] = useState([]);
=======
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCocktailById } from '../services/cocktailAPI';

function CocktailsInProgress() {
  const [recipeId, setRecipeId] = useState('');
>>>>>>> c3ac3e1da1eb25d160305118044481a500619366
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
<<<<<<< HEAD
  const [instructions, setInstructions] = useState('');
  const [alcoholic, setAlcoholic] = useState('');
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);
  const [storage, setStorage] = useState({cocktails: []});
  const [ checked, setChecked] = useState([]);

  const handleClick = () => {
    history.push("/receitas-feitas");
  };

  const handleChange = (ingredient) => {
    const getPrevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getPrevProgress = getPrevStorage.cocktails[recipeId];
    const updateStorage = {
      ...getPrevStorage,
      cocktails: { ...getPrevStorage.cocktails, [recipeId]: [...getPrevProgress, ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updateStorage));
    if (getPrevProgress.length + 1 === ingredMeasures.length) {
      setButtonIsEnabled(true);
    }
  }

  useEffect(() => {
    if (recipeId !== '') {
      handleClickCocktails(recipeId);
    setStorage(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  }, [recipeId]);

  useEffect(() => {
    const validate = storage.cocktails[recipeId];
    if (validate) {
      setChecked(storage.cocktails[recipeId]);
    }
  }, [storage]);

=======
  const [tags, setTags] = useState('');
  const history = useHistory();
>>>>>>> c3ac3e1da1eb25d160305118044481a500619366

  useEffect(() => {
    const path = history.location.pathname;
    const position = 2;
    const numberToSplice = 1;
    const splitPath = path.split('/')
      .splice(position, numberToSplice).toString();
    setRecipeId(splitPath);
    getCocktailById(splitPath)
      .then((res) => {
<<<<<<< HEAD
        const ingredientsArray = [];
        const measureArray = [];
        setTitle(res.drinks[0].strDrink);
        setSource(res.drinks[0].strDrinkThumb);
        setCategory(res.drinks[0].strCategory);
        setArea(res.drinks[0].strArea);
        setInstructions(res.drinks[0].strInstructions);
        setAlcoholic(res.drinks[0].strAlcoholic);
        Object.entries(res.drinks[0]).forEach(([key, value]) => {
          const noValue = 0;
          const minLength = 1;
          const ingredients = key.startsWith('strIngredient') ? value : noValue;
          const measure = key.startsWith('strMeasure') ? value : noValue;
          if (ingredients !== noValue
            && ingredients !== null && ingredients.length > minLength) {
            ingredientsArray.push(ingredients);
          }
          if (measure !== noValue) {
            measureArray.push(measure);
          }
        });
        setStoreIngredients(...storeIngredients, ingredientsArray);
        setStoreMeasures(...storeMeasures, measureArray);
        const getTogether = ingredientsArray
          .map((ingredient, index) => ({ [ingredient]: measureArray[index] }));
        setIngredMeasures(getTogether);
      });
  }, []);

  return (
    <div className="meal-details-page">
      <img
        alt="Cocktail"
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <ButtonsDetailsPage
        api={ {
          key: 'cocktail', recipeId, area, category, title, source, alcoholic } }
      />
      <h3 data-testid="recipe-category">{ category }</h3>
      <h3>Ingredientes</h3>
      <form>
        { ingredMeasures.map((element, index) => {
          const [key] = Object.keys(element);
          const [value] = Object.values(element);
          let isChecked = false;
          const validation = checked.find(ing => ing === `${key} - ${value}`);
          if (validation) {
            isChecked = true;
          }
          return (
            <div data-testid={ `${index}-ingredient-step` }>
              <input id={`ingredient-${index}`} type="checkbox" key={ index } onChange={() => handleChange(`${key} - ${value}`)} defaultChecked={isChecked}/>
              <label htmlFor={`ingredient-${index}`}>{ `${key} - ${value}` }</label>
            </div>
          );
        }) }
      </form>

      <h3>Instruções</h3>
      <p data-testid="instructions">{ instructions }</p>

      <button
        type="button"
        className="finishRecipe"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={!buttonIsEnabled}
      >
        Finalizar Receita
      </button>

=======
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
>>>>>>> c3ac3e1da1eb25d160305118044481a500619366
    </div>
  );
}

export default CocktailsInProgress;
