import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class RecipeDoneCard extends Component {
  render() {
    const { doneRecipes: {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
      doneDate,
      tags,
    }, index } = this.props;

    return (
      <div data-testid={ `${index}-recipe-card` }>
        {type === 'bebida' ? (
          <Link to={ `/bebidas/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ name }
            />
          </Link>
        ) : (
          <Link to={ `/comidas/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ name }
            />
          </Link>
        )}
        {type === 'bebida' ? (
          <Link
            to={ `/bebidas/${id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </Link>
        ) : (
          <Link
            to={ `/comidas/${id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </Link>
        )}
        {type === 'bebida' ? (
          <p data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
          </p>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${category}`}
          </p>
        ) }
        <p data-testid={ `${index}-horizontal-done-date` }>
          Feito em:
          { doneDate }
        </p>
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="Compartilhar receita"
        />
        {tags.map((tag) => (
          <p key={ index + tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </p>
        ))}
      </div>
    );
  }
}

RecipeDoneCard.propTypes = {
  doneRecipes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeDoneCard;
