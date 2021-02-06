import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import DoneCards from '../Components/DoneCards';

function ReceitasFeitas() {
  const [doneFoods, setDoneFoods] = useState([]);
  const [doneDrink, setDoneDrink] = useState([]);
  const [doneAll, setDoneAll] = useState([]);
  const doneInital = JSON.parse(localStorage.getItem('doneRecipes'));
  const [dones, setDones] = useState(doneInital);

  const getFavorites = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneAll(doneRecipes);

    if (doneRecipes) {
      doneRecipes.map((recipe) => {
        if (recipe.type === 'comida') {
          setDoneFoods((prevState) => ([...prevState, recipe]));
        }
        if (recipe.type === 'bebida') {
          setDoneDrink((prevState) => ([...prevState, recipe]));
        }
        return 1;
      });
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <Header text="Receitas Feitas" search={ false } />
      <div className="buttons__recipes_favorite">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setDones(doneAll) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setDones(doneFoods) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setDones(doneDrink) }
        >
          Drinks
        </button>
      </div>
      <DoneCards dones={ dones } />
    </div>
  );
}

export default ReceitasFeitas;
