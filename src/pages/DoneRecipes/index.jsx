import React, { useContext } from 'react';
import { Header } from '../../components';
import { RecipesContext } from '../../context';

export default function DoneRecipes() {
  const { doneRecipes, setDoneRecipes } = useContext(RecipesContext);
  const defaultRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header title="Receitas Feitas" />
      <main>
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
        {

        }
      </main>
    </div>
  );
}
