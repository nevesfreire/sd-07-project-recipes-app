import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function DoneFoodCard() {
  const [doneRecipes, setdoneRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const madenRecipes = window.localStorage.getItem('doneRecipes');
    if (madenRecipes) {
      const madeRecipesParse = JSON.parse(madenRecipes);
      setdoneRecipes(madeRecipesParse);
      console.log(madeRecipesParse);
    }
  }, []);

  const clearFilter = () => {
    setIsFiltered(false);
    setFilter('all');
  };

  const filterRecipes = (filt) => {
    console.log(isFiltered);
    if (isFiltered || filter !== filt) {
      const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === filt);
      setFiltered(filteredRecipes);
      setFilter(filt);
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
      clearFilter();
    }
  };

  return (
    <div
      style={ {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      } }
    >
      <div>
        <Button
          variant="info"
          data-testid="filter-by-all-btn"
          onClick={ () => clearFilter() }
        >
          All
        </Button>
        <Button
          variant="info"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Food
        </Button>
        <Button
          variant="info"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Drinks
        </Button>
      </div>
      {!isFiltered
        ? (
          doneRecipes.map((doneRecipe, index) => (
            <section
              key={ doneRecipe.id }
              style={ {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              } }
            >
              <img
                alt="favorites-"
                data-testid={ `${index}-horizontal-image` }
                src={ doneRecipe.image }
                style={ { marginTop: '10px', width: '50%', borderRadius: '15px' } }
              />
              <div
                style={ {
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                } }
              >
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { doneRecipe.category }
                </span>
                <span>
                  <h4 data-testid={ `${index}-horizontal-name` }>
                    {doneRecipe.name}
                  </h4>
                </span>
                <span data-testid={ `${index}-horizontal-done-date` }>
                  {doneRecipe.doneDate}
                </span>
                <img data-testid={ `${index}-horizontal-share-btn` } alt="compartilhe" />
                {doneRecipe.tags.map((tag) => (
                  <span
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ index }
                  >
                    { tag }
                  </span>))}
              </div>
            </section>
          )))
        : (
          filtered.map((filteredRecipe, index) => (
            <section
              key={ filteredRecipe.id }
              style={ {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              } }
            >
              <img
                alt="favorites-"
                data-testid={ `${index}-horizontal-image` }
                src={ filteredRecipe.image }
                style={ { marginTop: '10px', width: '50%', borderRadius: '15px' } }
              />
              <div
                style={ {
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                } }
              >
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { filteredRecipe.category }
                </span>
                <span>
                  <h4 data-testid={ `${index}-horizontal-name` }>
                    {filteredRecipe.name}
                  </h4>
                </span>
                <span data-testid={ `${index}-horizontal-done-date` }>
                  {filteredRecipe.doneDate}
                </span>
                <img data-testid={ `${index}-horizontal-share-btn` } alt="compartilhe" />
                {filteredRecipe.tags.map((tag) => (
                  <span
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ filteredRecipe.id }
                  >
                    { tag }
                  </span>))}
              </div>
            </section>
          )))}
    </div>
  );
}

export default DoneFoodCard;
