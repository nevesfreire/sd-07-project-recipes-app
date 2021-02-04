import React, { Component } from 'react';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipe.css';

class DoneRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleClipBoard = this.handleClipBoard.bind(this);
    this.state = {
      clipboard: {},
    };
  }

  handleClipBoard() {
    console.log('oi');
  }

  render() {
    const readLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(readLocalStorage);
    console.log(readLocalStorage[0].tags);
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
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ card.image }
                alt="foto da receita"
              />

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
              <button type="button" onClick={ this.handleClipBoard }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="icone de compartilhamento"
                  src={ shareIcon }
                />
              </button>

              <h1 data-testid={ `${index}-horizontal-name` }>{card.name}</h1>
              {console.log(card.tags)}
              {/* Para funcionar com a API tem que descomentar a linha abaixo e comentar a seguinte */}
              {card.tags.split(',').map((cardTag, indexTag) => (
              // {card.tags.map((cardTag, indexTag) => (
                <p
                  data-testid={ `${index}-${cardTag}-horizontal-tag` }
                  key={ indexTag }
                >
                  {cardTag}
                </p>
              ))}
            </div>
          ))}
        </div>
      );
    }
    return <p>Loading</p>;
  }
}

export default DoneRecipe;
