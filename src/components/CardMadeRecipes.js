import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

function CardMadeRecipes({ recipe, index }) {
  const [spanHidden, setSpanHidden] = useState(false);
  console.log(recipe, 'recipe');

  const {
    tags,
    id,
    name,
    area,
    category,
    type,
    alcoholicOrNot,
    image,
    doneDate,
  } = recipe;

  const urlComidas = `http://localhost:3000/comidas/${id}`;
  const urlBebidas = `http://localhost:3000/bebidas/${id}`;

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(true);
  }

  return (
    <div>
      {tags
        && (
          <div data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
            <p>{tags[0]}</p>
          </div>
        )}

      {tags
        && (
          <div data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
            <p>{tags[1]}</p>
          </div>
        )}

      {type === 'comida'
        ? (
          <Link to={ `/comidas/${id}` }>
            <div data-testid={ `${index}-horizontal-name` }><p>{name}</p></div>
          </Link>)
        : (
          <Link to={ `/bebidas/${id}` }>
            <div data-testid={ `${index}-horizontal-name` }><p>{name}</p></div>
          </Link>
        )}

      {type === 'comida'
        ? (
          <div data-testid={ `${index}-horizontal-top-text` }>
            <p>
              {`${area} - ${category}`}
            </p>
          </div>
        )
        : (
          <div data-testid={ `${index}-horizontal-top-text` }>
            <p>{alcoholicOrNot}</p>
          </div>
        )}

      <div data-testid={ `${index}-horizontal-done-date` }><p>{doneDate}</p></div>

      {type === 'bebida'
        ? (
          <Link to={ `/bebidas/${id}` }>
            <div
              src={ image }
              role="button"
              data-testid={ `${index}-horizontal-image` }
            >
              <img
                alt="recipeImg"
                src={ image }
              />
            </div>
          </Link>
        )
        : (
          <Link to={ `/comidas/${id}` }>
            <div
              src={ image }
              role="button"
              data-testid={ `${index}-horizontal-image` }
            >
              <img
                alt="recipeImg"
                src={ image }
              />
            </div>
          </Link>
        )}

      {type === 'comida'
        ? (
          <button type="button" onClick={ () => copyToClipBoard(urlComidas) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="img "
            />
          </button>
        )
        : (
          <button type="button" onClick={ () => copyToClipBoard(urlBebidas) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="img "
            />
          </button>
        )}

      <span hidden={ !spanHidden }>Link copiado!</span>
    </div>

  );
}

CardMadeRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf({
    tags: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.number,
  }).isRequired,
};

export default CardMadeRecipes;
