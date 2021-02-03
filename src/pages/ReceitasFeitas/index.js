import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import './styles.css';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

function ReceitasFeitas() {
  const [filters, setFilter] = useState('');
  const [copiedAlert, setCopiedAlert] = useState(false);

  const mds = 1000;

  const copyTo = (route, id) => {
    const elem = `http://localhost:3000/${route}/${id}`;
    copy(elem);
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, mds);
  };

  function renderFilters() {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setFilter('');
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setFilter('comida');
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilter('bebida');
          } }
        >
          Drinks
        </button>
      </div>
    );
  }

  function renderDoneReceipes() {
    const favorites = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!favorites) return <h3>Não há receitas feitas</h3>;
    const renderFav = favorites.filter((favorite) => favorite.type.includes(filters));
    return renderFav.map((favorite, index) => (
      <div key={ index }>
        {favorite.type === 'comida' ? (
          <div>
            <Link
              key={ index }
              className="list-drinks"
              to={ `/comidas/${favorite.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ favorite.image }
                alt={ favorite.name }
              />
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              { `${favorite.area} - ${favorite.category}` }
            </div>
            <div className="thumb-icons">
              <input
                type="image"
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copyTo('comidas', favorite.id);
                } }
                className="f-icon"
              />
            </div>
            <Link
              data-testid={ `${index}-horizontal-name` }
              className="df-name"
              to={ `/comidas/${favorite.id}` }
            >
              { favorite.name }
            </Link>
            <div data-testid={ `${index}-horizontal-done-date` }>{favorite.doneDate}</div>
            <div className="tags">
              { favorite.tags.map((tag, current) => (
                <div
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ current }
                >
                  { tag }
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <Link
              key={ index }
              className="list-drinks"
              to={ `/bebidas/${favorite.id}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ favorite.image }
                alt={ favorite.name }
              />
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              { favorite.alcoholicOrNot }
            </div>
            <div className="thumb-icons">
              <input
                type="image"
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  copyTo('bebidas', favorite.id);
                } }
                className="f-icon"
              />
            </div>
            <Link
              data-testid={ `${index}-horizontal-name` }
              className="df-name"
              to={ `/bebidas/${favorite.id}` }
            >
              { favorite.name }
            </Link>
            <div data-testid={ `${index}-horizontal-done-date` }>{favorite.doneDate}</div>
            { favorite.tags.map((tag, current) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ current }
              >
                { tag }
              </div>
            ))}
          </div>
        )}
        { copiedAlert && <p>Link copiado!</p> }
      </div>
    ));
  }

  useEffect(() => {
    renderDoneReceipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" searchButtonExists={ false } />
      { renderFilters() }
      { renderDoneReceipes() }
    </div>
  );
}

export default ReceitasFeitas;
