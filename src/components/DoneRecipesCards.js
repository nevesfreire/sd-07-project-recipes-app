import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import './donerecipes.css';

function DoneRecipesCards({
  thumb,
  title,
  index,
  id,
  type,
  tags,
  category,
  doneDate,
  area,
  alcoholicOrNot,
}) {
  const [copyMessage, setCopyMessage] = useState('');
  const url = (text) => {
    let returnText = '';
    switch (text) {
    case 'bebida':
      returnText = 'bebidas';
      break;
    case 'comida':
      returnText = 'comidas';
      break;
    default:
      returnText = text;
      break;
    }
    return returnText;
  };

  const copyClipboard = () => {
    const urlarray = window.location.href.split('/');
    const urlToCopy = `${urlarray[0]}//${urlarray[2]}/${type}s/${id}`;
    clipboardCopy(urlToCopy);
    setCopyMessage('Link copiado!');
  };

  return (
    <div>
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="compartilhar"
        onClick={ copyClipboard }
      />
      {copyMessage}
      <Link to={ `/${url(type)}/${id}` }>
        <div className="img_recipes">
          <img
            src={ thumb }
            alt="Imagem do profile"
            data-testid={ `${index}-horizontal-image` }
          />
          <div>
            Category:
            {' '}
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${area}${alcoholicOrNot} - ${category}`}
            </p>
          </div>
          <div className="div" data-testid="page-div">
            <p data-testid={ `${index}-horizontal-name` }>{title}</p>
          </div>
          <div>
            Feito em:
            {' '}
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
          </div>
          {tags.map((tag, counter) => (
            <p key={ counter } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          ))}
        </div>
      </Link>
    </div>
  );
}

DoneRecipesCards.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DoneRecipesCards;
