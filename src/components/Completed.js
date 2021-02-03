import React, { useEffect, useState } from 'react';
import filtro from './filtro';
import getListFromLocal from './getListFromLocal';
// import addToFavorites from './addToFavorites';

const copy = require('clipboard-copy');

function Completed() {
  const zero = 0;
  const [finishedList, setFinishedList] = useState([]);
  const [showMessage, setShowMessage] = useState('hidden');
  const tresMil = 3000;

  const copyLink = (id, type) => {
    const url = `http://localhost:3000/${type === 'comida' ? 'comidas' : 'bebidas'}/${id}`;
    copy(url);
    setShowMessage('');
    setTimeout(() => { setShowMessage('hidden'); }, tresMil);
  };

  useEffect(() => {
    // const getListFromLocal = (setFinishedList) => {
    //   const list = JSON.parse(localStorage.getItem('doneRecipes'));
    //   if (list) setFinishedList(list);
    //   console.log(list);
    // };
    getListFromLocal(setFinishedList);
  }, []);

  return (
    <div>
      <button
        onClick={ () => filtro('comida', setFinishedList) }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>

      <button
        onClick={ () => filtro('bebida', setFinishedList) }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <button
        onClick={ () => filtro('all', setFinishedList) }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      {
        finishedList.length === zero
          ? <h3>Nenhuma Receita Finalizada =]</h3>
          : finishedList.map((receita, index) => (
            <div key={ `receita-${index}` }>
              <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
                <img
                  src={ receita.image }
                  width="100%"
                  alt="foto de uma comida"
                  data-testid={ `${index}-horizontal-image` }
                />
              </a>
              <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {receita.name}
                </p>
              </a>

              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {receita.type === 'Drink' ? null
                  : `${receita.area} - ${receita.category}`}
              </p>

              { receita.type === 'Meal'
                ? null
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {receita.alcoholicOrNot}
                  </p>)}
              <p data-testid={ `${index}-horizontal-done-date` }>
                {receita.doneDate}
              </p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src="../src/images/shareIcon.svg"
                onClick={ () => copyLink(receita.id, receita.type) }
              >
                Compartilhar
              </button>

              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src="../src/images/blackHeartIcon.svg"
              // onClick={ () => addToFavorites(itemId, receita.type, details) }
              >
                Favoritar
              </button>
              <h4 hidden={ showMessage }>Link copiado!</h4>
              {receita.tags.map((item) => (
                <p
                  key={ item }
                  data-testid={ `${index}-${item}-horizontal-tag` }
                >
                  {item}
                </p>
              ))}
            </div>))
      }
    </div>
  );
}

export default Completed;
