import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import ShareDoneRecipe from '../components/ShareDoneRecipe';
import allActions from '../actions';

function DoneRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Receitas Feitas'));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex-container">
        <button
          type="button"
          className="btn-small"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="btn-small"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="btn-small"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div className="flex-container">
        {something.map((recipe, index) => (
          <div className="card-recipe__done" key={ index }>
            <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
            <div className="flex-container card-recipe__info-text">
              <h4
                className="card-recipe__top-text"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type}
              </h4>
              <h2
                className="card-recipe__title-text"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h2>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {`Feita em: ${recipe.date}`}
              </p>
              <ShareDoneRecipe data-testid={ `${index}-horizontal-share-btn` } />
              <div className="card-recipe__tags">
                {recipe.tags.map((tagName, i) => (
                  <button
                    type="button"
                    data-testid={ `data-testid=${i}-${tagName}-horizontal-tag` }
                    key={ i }
                  >
                    {tagName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
