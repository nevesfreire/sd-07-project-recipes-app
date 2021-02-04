import React from 'react';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

class ReceitasFavoritas extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.renderToBebidas = this.renderToBebidas.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      favorites,
    });
  }

  renderToBebidas(fav) {
    if (fav.type === 'comida') {
      return `${fav.area} - ${fav.category}`;
    } return `${fav.alcoholicOrNot}`;
  }

  renderCards() {
    const { favorites } = this.state;
    return (
      favorites.map((fav, index) => (
        <div key={ fav.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ fav.image }
            alt="comida"
          />
          <p data-testid={ `${index}-horizontal-name` }>{fav.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { this.renderToBebidas(fav) }
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share" />
          </button>
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
        <Footer />
      </div>
    );
  }
}

export default ReceitasFavoritas;
