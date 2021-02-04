import React from 'react';
import copy from 'clipboard-copy';
import Header2 from '../../components/header/Header2';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

class ReceitasFavoritas extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      copyClipboard: false,
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.renderToBebidas = this.renderToBebidas.bind(this);
    this.copyingClipboard = this.copyingClipboard.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      this.setState({
        favorites,
      });
    }
  }

  copyingClipboard(id) {
    copy(`http://localhost:3000/comidas/${id}`);
    this.setState({
      copyClipboard: true,
    });
  }

  renderToBebidas(fav) {
    if (fav.type === 'comida') {
      return `${fav.area} - ${fav.category}`;
    } return `${fav.alcoholicOrNot}`;
  }

  renderCards() {
    const { favorites, copyClipboard } = this.state;
    return (
      favorites.map((fav, index) => (
        <div className="card-favorite" key={ fav.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ fav.image }
            alt="comida"
            width="100px"
          />
          <p data-testid={ `${index}-horizontal-name` }>{fav.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { this.renderToBebidas(fav) }
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => this.copyingClipboard(fav.id) }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <span>
            {copyClipboard === true ? 'Link copiado!' : ''}
          </span>
          <button
            type="button"
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeartIcon } alt="favorite" />
          </button>
        </div>
      ))
    );
  }

  render() {
    return (
      <div>
        <Header2 title="Receitas Favoritas" />
        {this.renderCards()}
      </div>
    );
  }
}

export default ReceitasFavoritas;
