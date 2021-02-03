import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

const CardComplete = (props) => {
  const {
    num,
    img,
    category,
    nameRecipe,
    date,
    tags,
    area,
    alcoholicOrNot,
    type,
    id,
  } = props;
  const typeRecipe = type === 'comida' ? 'comidas' : 'bebidas';
  const limitTags = 2;
  const initArr = 0;
  const firstTags = tags.slice(initArr, limitTags);

  const [copyBtn, setCopyBtn] = useState('Compartilhar');

  const copyLink = () => {
    setCopyBtn('Link copiado!');
    return `http://localhost:3000/${typeRecipe}/${id}`;
  };

  const areaFormat = area !== '' ? `${area} -` : '';
  const alcoholicFormat = alcoholicOrNot !== '' ? `- ${alcoholicOrNot}` : '';

  return (
    <div>
      <Link to={ `/${typeRecipe}/${id}` }>
        <img
          src={ img }
          alt={ nameRecipe }
          width="200"
          data-testid={ `${num}-horizontal-image` }
        />
        <p data-testid={ `${num}-horizontal-name` }>{nameRecipe}</p>
      </Link>
      <p
        data-testid={ `${num}-horizontal-top-text` }
      >
        {`${areaFormat} ${category} ${alcoholicFormat}`}

      </p>

      <p data-testid={ `${num}-horizontal-done-date` }>{date}</p>
      <button
        type="button"
        data-testid={ `${num}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ () => copy(copyLink()) }
      >
        {copyBtn}
      </button>
      {firstTags.map((elem) => (
        <p
          key={ elem + nameRecipe }
          data-testid={ `${num}-${elem}-horizontal-tag` }
        >
          {elem}
        </p>
      ))}
    </div>
  );
};

export default CardComplete;
