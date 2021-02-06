import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import './FavoriteCards.css';

const copy = require('clipboard-copy');

function DoneCards({ dones }) {
  const [copyLink, setCopyLink] = useState(false);

  const twentySeconds = 20000;
  const zero = 0;

  const shareRecipe = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
    setTimeout(() => setCopyLink(false), twentySeconds);
  };

  return (
    <div className="container__favoriteCards">
      { copyLink && <p className="aaaa">Link copiado!</p>}
      {dones && dones.map(({
        name,
        doneDate,
        tags,
        image,
        category,
        alcoholicOrNot,
        type,
        id,
        area,
      }, index) => (
        <div key={ id }>
          <a
            key={ id }
            href={ `/${type}s/${id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ name }
              src={ image }
              width="200px"
            />
          </a>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
          </p>
          <a
            key={ id }
            href={ `/${type}s/${id}` }
          >
            <h4
              className="Favorite___card__name"
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </h4>
          </a>

          <button
            className="aaaa"
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => shareRecipe(id, type) }
            src={ shareIcon }
          >
            <img
              alt="share"
              src={ shareIcon }
              width="50px"
            />
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em: ${doneDate}`}</p>
          <div>
            {tags.length > zero && tags.map((tag, i) => (
              <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

DoneCards.propTypes = {
  dones: PropTypes.node.isRequired,
};

export default DoneCards;

// O imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image";
// O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text";
// O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name";
// O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
// O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
// As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;

// alcoholicOrNot: ""
// area: "Turkish"
// category: "Side"
// doneDate: "6/2/2021"
// id: "52977"
// image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
// name: "Corba"
// tags: ["Soup"]
// type: "comida"

// alcoholicOrNot: ""
// area: "Italian"
// category: "Vegetarian"
// doneDate: "6/2/2021"
// id: "52771"
// image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
// name: "Spicy Arrabiata Penne"
// tags: (2) ["Pasta", "Curry"]
// type: "comida"
