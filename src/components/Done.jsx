import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function Done({ recipesStorage }) {
  const [copy, setCopy] = useState(false);

  const copyLink = () => {
    const delay = 2000;
    setCopy(true);
    setTimeout(() => setCopy(false), delay);
  };

  return (
    <div className="div-favorite">
      <p>{copy && 'Link copiado!'}</p>
      {recipesStorage.map((recipes, index) => (
        <div key={ recipes.id } className="div-favorite-div">
          <div className="div-recipes-favorite">
            <Link to={ `${recipes.type}/${recipes.id}` }>
              <img
                className="img-favorite"
                src={ recipes.image }
                data-testid={ `${recipes.index}-horizontal-image` }
                alt="Imagem Receita"
              />
            </Link>
            <div className="div-span-p">
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipes.area === '' ? '' : recipes.area} - 
                ${recipes.alcoholicOrNot === ''
          ? recipes.category : recipes.alcoholicOrNot}`}
              </span>
              <h5
                data-testid={ `${index}-horizontal-name` }
              >
                <Link to={ `${recipes.type}/${recipes.id}` }>{ recipes.name }</Link>
              </h5>
              <h6
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipes.dataDone }
              </h6>
              {recipes.type === 'comida'
              && recipesStorage[recipes.tags]
              && recipesStorage[recipes.tags].map((tag) => (
                <h6
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ index }
                >
                  { tag }
                </h6>
              ))}
            </div>
          </div>
          <div className="div-buttons-share-favorite">
            <CopyToClipboard text={ `http://localhost:3000/${recipes.type}s/${recipes.id}` }>
              <button
                type="button"
                onClick={ () => copyLink() }
              >
                <img
                  className="img-compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Icone Compartilhar"
                />
              </button>
            </CopyToClipboard>
          </div>
        </div>
      ))}
    </div>
  );
}

Done.propTypes = {
  recipesStorage: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired).isRequired,
};

export default Done;
