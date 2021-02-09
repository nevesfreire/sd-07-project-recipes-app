import React, { useContext } from 'react';
import { Header, DoneCard } from '../../components';
import { RecipesContext } from '../../context';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const { doneRecipes, setDoneRecipes } = useContext(RecipesContext);
  const defaultRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div className="done-recipes-container">
      <Header title="Receitas Feitas" />
      <main className="done-recipes-content">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRecipes(defaultRecipes) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setDoneRecipes(
              defaultRecipes.filter((recipe) => recipe.type === 'comida'),
            );
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setDoneRecipes(
              defaultRecipes.filter((recipe) => recipe.type === 'bebida'),
            );
          } }
        >
          Drink
        </button>
        <div>
          {
            doneRecipes && doneRecipes.map((recipe, index) => (
              <DoneCard index={ index } key={ index } recipe={ recipe } />
            ))
          }
        </div>
      </main>
    </div>
  );
}
