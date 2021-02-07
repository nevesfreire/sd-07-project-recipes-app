import React, { useState, useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { loadState } from '../services/localStorage';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import shareIcon from '../images/shareIcon.svg';
import '../styles/pages/receitasFeitas.css';

function ReceitasFeitas() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [doneRecipeList, setDoneRecipeList] = useState([]);

  const { copyVisibility, setCopyVisibility } = useContext(CoffeAndCodeContext);

  const updateDoneRecipes = () => {
    const loadStore = loadState('doneRecipes', []);
    switch (currentCategory) {
    case 'All':
      return loadStore;
    case 'Food':
      return loadStore.filter((currentObject) => currentObject.type === 'comida');
    case 'Drinks':
      return loadStore.filter((currentObject) => currentObject.type === 'bebida');
    default:
      console.log('Não foi possível selecionar a categoria');
    }
  };

  const getUrl = (type, id) => `http://localhost:3000/${type}s/${id}`;

  const changeCurrentFilter = ({ target: { name } }) => {
    if (name === currentCategory) setCurrentCategory('All');
    else setCurrentCategory(name);
  };

  useEffect(() => {
    setDoneRecipeList(updateDoneRecipes());
  }, [currentCategory]);

  return (
    <div>
      <Header name="Receitas Feitas" button={ false } />
      <div className="container-btn">
        <button
          className="btn-recipes"
          type="button"
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ (event) => changeCurrentFilter(event) }
        >
          All
        </button>
        <button
          className="btn-recipes"
          type="button"
          data-testid="filter-by-food-btn"
          name="Food"
          onClick={ (event) => changeCurrentFilter(event) }
        >
          Food
        </button>
        <button
          className="btn-recipes"
          type="button"
          data-testid="filter-by-drink-btn"
          name="Drinks"
          onClick={ (event) => changeCurrentFilter(event) }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          doneRecipeList.map((card, index) => (
            <div
              className="holder"
              key={ `${index}-${card.name}` }
            >
              <div>
                <Link to={ `${card.type}s/${card.id}` }>
                  <img
                    className="image"
                    src={ card.image }
                    alt={ card.name }
                    style={ { width: '20vw' } }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              </div>
              <div>
                {
                  card.type === 'comida' ? (
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${card.area} - ${card.category}` }
                    </span>
                  ) : (
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { card.alcoholicOrNot }
                    </span>
                  )
                }
                <div>
                  <Link to={ `${card.type}s/${card.id}` }>
                    <span
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { card.name }
                    </span>
                  </Link>
                </div>
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Feita em: ${card.doneDate}` }
                </span>
                {
                  card.tags && (
                    card.tags.map((tag) => (
                      <span
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </span>
                    ))
                  )
                }
              </div>
              <div>
                <CopyToClipboard text={ getUrl(card.type, card.id) }>
                  <button
                    onClick={ () => setCopyVisibility('visible') }
                    type="button"
                  >
                    <img
                      src={ shareIcon }
                      data-testid={ `${index}-horizontal-share-btn` }
                      alt="share button"
                    />
                  </button>
                </CopyToClipboard>
              </div>
              <small style={ { visibility: copyVisibility } }>Link copiado!</small>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
