import React from 'react';
import PropTypes from 'prop-types';

const copy = require('clipboard-copy');

class RecipesLiked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: 'hidden',
      favoriteList: [],
    };
    this.deleteFavorites = this.deleteFavorites.bind(this);
    this.copyLink = this.copyLink.bind(this);
  }

  componentDidMount() {
    this.naoSouComponentDidMount();
  }

  naoSouComponentDidMount() {
    const { favoriteRecipes } = this.props;
    this.setState({
      favoriteList: favoriteRecipes,
    });
  }

  filtro(type) {
    let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'all') { this.setState({ favoriteList: favList }); } else {
      favList = favList.filter((item) => item.type === type);
      this.setState({ favoriteList: favList });
    }
  }

  deleteFavorites(itemId) {
    let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favList = favList.filter((item) => itemId !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
    this.setState({ favoriteList: favList });
  }

  copyLink(id, type) {
    const url = `http://localhost:3000/${type === 'comida' ? 'comidas' : 'bebidas'}/${id}`;
    copy(url);
    this.setState({ showMessage: '' });
  }

  render() {
    const { favoriteList } = this.state;
    console.log(favoriteList);
    const { showMessage } = this.state;

    return (
      <div>
        <button
          onClick={ () => this.filtro('comida') }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          onClick={ () => this.filtro('bebida') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        <button
          onClick={ () => this.filtro('all') }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        {favoriteList.map((receita, index) => (
          <div key={ `receita-${index}` }>
            <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
              <img
                src={ receita.image }
                width="100%"
                alt="foto de uma comida"
                data-testid={ `${index}-horizontal-image` }
              />
            </a>
            <a href={ `http://localhost:3000/${receita.type === 'comida' ? 'comidas' : 'bebidas'}/${receita.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {receita.name}
              </p>
            </a>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {receita.type === 'Drink' ? null
                : `${receita.area} - ${receita.category}`}
            </p>

            { receita.type === 'Meal'
              ? null
              : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {receita.alcoholicOrNot}
                </p>)}

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src="../src/images/shareIcon.svg"
              onClick={ () => this.copyLink(receita.id, receita.type) }
            >
              Compartilhar
            </button>

            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src="../src/images/blackHeartIcon.svg"
              onClick={ () => this.deleteFavorites(receita.id) }
            >
              Favoritar
            </button>
            <h4 hidden={ showMessage }>Link copiado!</h4>
          </div>))}
      </div>
    );
  }
}

RecipesLiked.propTypes = {
  favoriteRecipes: PropTypes.objectOf.isRequired,
};

export default RecipesLiked;
