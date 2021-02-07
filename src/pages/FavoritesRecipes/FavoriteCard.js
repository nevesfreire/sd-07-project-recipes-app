import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteCard({ data, index, disfavorItem }) {
  const [showCopiedMessage, setCopiedMessage] = useState('hidden');

  const copyLink = (type, id) => {
    const twoSecondes = 2000;
    let kindOfFood = '';
    if (type === 'comida') kindOfFood = 'comidas';
    else kindOfFood = 'bebidas';
    const getUrl = `http://localhost:3000/${kindOfFood}/${id}`;
    copy(getUrl);
    setCopiedMessage('');
    setTimeout(() => { setCopiedMessage('hidden'); }, twoSecondes);
  };

  const {
    alcoholicOrNot,
    area,
    category,
    id,
    image,
    name,
    type,
  } = data;
  return (
    <Card style={ { maxWidth: 200 } }>
      <Link to={ `/${type}s/${id}` }>
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          width="75px"
          alt="Foto de Alimento"
        />
      </Link>
      <Card.Body>
        <Card.Subtitle
          data-testid={ `${index}-horizontal-top-text` }
          style={ { color: '#888' } }
        >
          { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
        </Card.Subtitle>
        <Link to={ `/${type}s/${id}` }>
          <Card.Title data-testid={ `${index}-horizontal-name` }>
            { name }
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Footer>
        <Button
          data-testid={ `${index}-horizontal-share-btn` }
          style={ { background: 'transparent', border: 0 } }
          src={ shareIcon }
          onClick={ () => copyLink(type, id) }
        >
          <img
            src={ shareIcon }
            alt="Ícone de Compartilhar"
          />
        </Button>
        <p hidden={ showCopiedMessage }>Link copiado!</p>
        <Button
          data-testid={ `${index}-horizontal-favorite-btn` }
          style={ { background: 'transparent', border: 0 } }
          src={ blackHeartIcon }
          onClick={ () => disfavorItem(id) }
        >
          <img
            src={ blackHeartIcon }
            alt="Ícone de Favoritar"
          />
        </Button>
      </Card.Footer>
    </Card>
  );
}

FavoriteCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  disfavorItem: PropTypes.func.isRequired,
};

export default FavoriteCard;
