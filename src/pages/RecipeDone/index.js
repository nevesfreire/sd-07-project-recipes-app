import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Header, RecipeFilter } from '../../components';
import ShareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const RecipeDone = () => {
  const { pathname } = useLocation();
  const recipes = useSelector((state) => state.recipes);
  let cards;
  if (pathname.includes('feitas')) {
    cards = recipes.doneRecipes;
  } else {
    cards = recipes.favoriteRecipes;
  }

  const typeOfCardDone = (item, index) => {
    if (item.type === 'meal') {
      return (
        <div key={ item.id }>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            { `${item.strArea} - ${item.strCategory}` }
          </h5>
          <Link to={ `/comidas/${item.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>
              {item.name}
            </h2>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { `Feita em: ${item.doneDate}` }
          </p>
          { item.strTags !== null
            && item.strTags.split(',').map(
              (itemTag) => (
                <span
                  key={ itemTag }
                  data-testid={ `${index}-${itemTag}-horizontal-tag` }
                >
                  { itemTag }
                </span>
              ),
            )}
          <button
            type="button"
            onClick={ () => copy(` http://localhost:3000/comidas/${item.id} `) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ ShareIcon } alt="compartilhar item" />
          </button>
          <Link to={ `/comidas/${item.id}` }>
            <img
              src={ item.strThumb }
              height="100px"
              alt="Receita"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
      );
    }

    if (item.type === 'drink') {
      return (
        <div key={ item.id }>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {item.trAlcoholic}
          </h5>
          <Link to={ `/bebidas/${item.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>
              {item.name}
            </h2>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { `Feita em: ${item.doneDate}` }
          </p>
          <button
            type="button"
            onClick={ () => copy(` http://localhost:3000/bebidas/${item.id} `) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ ShareIcon } alt="compartilhar item" />
          </button>
          <Link to={ `/bebidas/${item.id}` }>
            <img
              src={ item.strThumb }
              height="100px"
              alt="Receita"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
      );
    }
  };

  const typeOfCardFavorites = (item, index) => {
    if (item.type === 'meal') {
      return (
        <div key={ item.id }>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            { `${item.strArea} - ${item.strCategory}` }
          </h5>
          <Link to={ `/comidas/${item.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>
              {item.name}
            </h2>
          </Link>
          <button
            type="button"
            onClick={ () => copy(` http://localhost:3000/comidas/${item.id} `) }
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeart } alt="favoritar item" />
          </button>
          <button
            type="button"
            onClick={ () => copy(` http://localhost:3000/comidas/${item.id} `) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ ShareIcon } alt="compartilhar item" />
          </button>
          <Link to={ `/comidas/${item.id}` }>
            <img
              src={ item.strThumb }
              height="100px"
              alt="Receita"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
      );
    }

    if (item.type === 'drink') {
      return (
        <div key={ item.id }>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {item.strAlcoholic}
          </h5>
          <Link to={ `/bebidas/${item.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>
              {item.name}
            </h2>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeart } alt="favoritar item" />
          </button>
          <button
            type="button"
            onClick={ () => copy(` http://localhost:3000/bebidas/${item.id} `) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ ShareIcon } alt="compartilhar item" />
          </button>
          <Link to={ `/bebidas/${item.id}` }>
            <img
              src={ item.strThumb }
              height="100px"
              alt="Receita"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <Header
        title={ pathname.includes('feitas') ? 'Receitas Feitas' : 'Receitas Favoritas' }
        showSearchBar={ false }
      />
      <RecipeFilter />
      {pathname.includes('feitas')
        ? cards.map((card, index) => (typeOfCardDone(card, index)))
        : cards.map((card, index) => (typeOfCardFavorites(card, index)))}
    </>
  );
};

export default RecipeDone;
