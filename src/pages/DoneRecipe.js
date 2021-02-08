import React, { Component } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { copyButton } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipe.css';

class DoneRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleClipBoard = this.handleClipBoard.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  handleClipBoard(type, id) {
    const { executeCopy } = this.props;
    copy(`http://localhost:3000/${type}s/${id}`);
    executeCopy('Link copiado!');
  }

  handleTags(tags) {
    if (tags && typeof tags === 'object') {
      // console.log(tags);
      return tags;
    }
    if (tags && typeof tags === 'string') {
      // console.log(tags.split(','));
      return tags.split(',');
    }
  }

  render() {
    const readLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const { valueCopied } = this.props;
    // console.log(readLocalStorage[0].tags);
    if (readLocalStorage) {
      return (
        <div>
          <button type="button" data-testid="filter-by-all-btn">
            All
          </button>
          <button type="button" data-testid="filter-by-food-btn">
            Food
          </button>
          <button type="button" data-testid="filter-by-drink-btn">
            Drinks
          </button>

          {readLocalStorage.map((card, index) => (
            <div key={ card.id }>
              <Link
                to={ `/${card.type}s/${card.id}` }
                className="link-categories"
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ card.image }
                  alt="foto da receita"
                />
              </Link>

              {card.type === 'comida' ? (
                <h2 data-testid={ `${index}-horizontal-top-text` }>
                  {`${card.area} - ${card.category}`}
                </h2>
              ) : (
                <h2 data-testid={ `${index}-horizontal-top-text` }>
                  {card.alcoholicOrNot}
                </h2>
              )}
              <p data-testid={ `${index}-horizontal-done-date` }>
                {card.doneDate}
              </p>
              <p>{valueCopied}</p>
              <button
                type="button"
                onClick={ () => this.handleClipBoard(card.type, card.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="icone de compartilhamento"
                  src={ shareIcon }
                />
              </button>

              <h1 data-testid={ `${index}-horizontal-name` }>{card.name}</h1>
              {card.tags ? (
                this.handleTags(card.tags).map((cardTag, indexTag) => (
                  <p
                    data-testid={ `${index}-${cardTag}-horizontal-tag` }
                    key={ indexTag }
                  >
                    {cardTag}
                  </p>
                ))
              ) : (
                <p />
              )}
            </div>
          ))}
        </div>
      );
    }
    return <p>Loading</p>;
  }
}

const mapStateToProps = ({ recomendationsReducer }) => ({
  valueCopied: recomendationsReducer.copy,
});

const mapDispatchToProps = (dispatch) => ({
  executeCopy: (value) => dispatch(copyButton(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoneRecipe);

DoneRecipe.propTypes = {
  executeCopy: PropTypes.func.isRequired,
  valueCopied: PropTypes.string.isRequired,
};
