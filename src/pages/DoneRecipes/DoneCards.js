import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import ShareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneCards({ index, data }) {
  const [showCopiedMessage, setCopiedMessage] = useState('hidden');
  const {
    id,
    area,
    name,
    type,
    image,
    category,
    doneDate,
    tags,
    alcoholicOrNot: alcoholic,
  } = data;

  const copyLink = () => {
    const twoSecondes = 2000;
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
    setCopiedMessage('');
    setTimeout(() => { setCopiedMessage('hidden'); }, twoSecondes);
  };

  return (
    <Card style={ { maxWidth: 200 } }>
      <Link to={ `/${type}s/${id}` }>
        <Card.Img
          src={ image }
          alt="thumbnail"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Card.Body>
        <Card.Subtitle
          data-testid={ `${index}-horizontal-top-text` }
          style={ { color: '#888' } }
        >
          {type === 'comida' && (area === '' ? category : `${area} - ${category}`)}
          {type === 'bebida' && alcoholic}
        </Card.Subtitle>
        <Link to={ `/${type}s/${id}` }>
          <Card.Title data-testid={ `${index}-horizontal-name` }>
            {name}
          </Card.Title>
        </Link>
        <Card.Subtitle
          style={ { fontSize: 14 } }
          data-testid={ `${index}-horizontal-done-date` }
        >
          {doneDate}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        {tags.map((tag) => (
          <small
            key={ tag }
            className="text-muted"
            style={ { padding: 5 } }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {`${tag} `}
          </small>
        ))}
        <Button
          type="button"
          style={ { background: 'transparent', border: 0 } }
          onClick={ copyLink }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            alt="share"
            src={ ShareIcon }
          />
        </Button>
        <p hidden={ showCopiedMessage }>Link copiado!</p>
      </Card.Footer>
    </Card>
  );
}

DoneCards.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default DoneCards;
