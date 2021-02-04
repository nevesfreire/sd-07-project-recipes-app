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
      {recipesStorage.map(
        ({ id, type, area, category, image, alcoholicOrNot, name }, index) => (
          <div key={ id } className="div-favorite-div">
            <div className="div-recipes-favorite">
              <Link to={ `${type}s/${id}` }>
                <img
                  className="img-favorite"
                  src={ image }
                  data-testid={ `${index}-horizontal-image` }
                  alt="Imagem Receita"
                />
              </Link>
              <div className="div-span-p">
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${area === '' ? '' : area} - ${alcoholicOrNot === ''
                    ? category : alcoholicOrNot}`}
                </span>
                <h5
                  data-testid={ `${index}-horizontal-name` }
                >
                  <Link to={ `${type}s/${id}` }>{ name }</Link>
                </h5>
                <h6
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  dataDone
                </h6>
                {/* type === 'comida'
                && recipesStorage.tag.map((tag) => (
                  <h6
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ index }
                  >
                    { tag }
                  </h6>
                )) */}
              </div>
            </div>
            <div className="div-buttons-share-favorite">
              <CopyToClipboard text={ `http://localhost:3000/${type}s/${id}` }>
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
        ),
      )}
    </div>
  );
}

Done.propTypes = {
  recipesStorage: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default Done;
