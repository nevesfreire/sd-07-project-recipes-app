import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [recipes, setRecipes] = useState();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const shareClicker = (type, id) => {
    setCopied(true);
    return copy(`http://localhost:3000/${type}s/${id}`);
  };

  const filterFood = () => {
    const foods = recipes.filter((recipe) => recipe.type === 'comida');
    setRecipes(foods);
  };

  const filterDrink = () => {
    const drinks = recipes.filter((recipe) => recipe.type === 'bebida');
    setRecipes(drinks);
  };

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
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </header>

      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setRecipes(
            JSON.parse(localStorage.getItem('doneRecipes')),
          ) }
        >
          All
        </button>

        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filterFood() }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterDrink() }
        >
          Drink
        </button>
      </div>
      {
        recipes
        && recipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: '25%' } }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>

            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {(recipe.type === 'comida')
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </h3>

            <h3 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h3>

            <label htmlFor="shareBtn">
              <input
                type="image"
                src={ shareIcon }
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
                id="shareBtn"
                onClick={ () => shareClicker(recipe.type, recipe.id) }
              />
              {(copied) && 'Link copiado!'}
            </label>

            {
              recipe.tags.map((tag) => (
                <div key={ recipe.id } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  <h4>{tag}</h4>
                </div>))
            }
          </div>
        ))
      }
    </div>
  );
}

export default DoneRecipes;
