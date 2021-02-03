import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class RecipeDoneCard extends Component {
  render() {
    const { doneRecipes: {
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
        <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        {type === 'bebida' ? <p>{ alcoholicOrNot}</p>
          : (
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
        <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</p>
        <p data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</p>
      </div>
    );
  }
}

RecipeDoneCard.propTypes = {
  doneRecipes: PropTypes.shape({
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
