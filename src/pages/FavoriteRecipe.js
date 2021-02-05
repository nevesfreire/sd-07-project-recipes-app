import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import { copyButton } from '../actions';
import profileIcon from '../images/profileIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/recipe.css';

class FavoriteRecipe extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
    this.redirectRecipe = this.redirectRecipe.bind(this);
    this.handleCopy = this.handleCopy.bind(this);

    this.state = {
      recipes: [],
      favorite: true,
    };
  }

  componentDidMount() {
    this.handleState();
  }

  componentWillUnmount() {
    const { executeCopy } = this.props;
    executeCopy('');
  }

  handleState() {
    const readFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      recipes: readFavorite,
    });
  }

  handleCopy(type, id) {
    const { executeCopy } = this.props;
    copy(`http://localhost:3000/${type}s/${id}`);
    executeCopy('Link copiado!');
  }

  redirectRecipe(type, id) {
    const { history } = this.props;
    history.push(`/${type}s/${id}`);
  }

  changeFavorite(id) {
    const { recipes } = this.state;
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    this.setState({
      recipes: newRecipes,
    });
  }

  filterRecipes(typeButton) {
    const readFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      recipes: readFavorite,
    },
    () => {
      const { recipes } = this.state;
      const newRecipes = recipes.filter((recipe) => recipe.type === typeButton);
      this.setState({
        recipes: newRecipes,
      });
    });
  }

  render() {
    const { recipes, favorite } = this.state;
    const { history, valueCopied } = this.props;
    return (
      <div>
        <header>
          <button
            type="button"
            onClick={ () => history.push('/perfil') }
          >
            <img src={ profileIcon } alt="profileIcon" />
          </button>
          <h1>Receitas Favoritas</h1>
        </header>
        <section>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ this.handleState }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => this.filterRecipes('comida') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filterRecipes('bebida') }
          >
            Drinks
          </button>
        </section>
        <section>
          {
            recipes.map((recipe, index) => {
              const { alcoholicOrNot, area, category, id, image, name, type } = recipe;
              return (
                <div key={ id }>
                  <button
                    type="button"
                    onClick={ () => this.redirectRecipe(type, id) }
                  >
                    <img
                      src={ image }
                      alt={ name }
                      data-testid={ `${index}-horizontal-image` }
                      width="200"
                    />
                  </button>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
                  </p>
                  <button
                    type="button"
                    onClick={ () => this.redirectRecipe(type, id) }
                  >
                    <h1
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {name}
                    </h1>
                  </button>
                  <p>{ valueCopied }</p>
                  <button
                    type="button"
                    onClick={ () => this.handleCopy(type, id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="shareIcon"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.changeFavorite(id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ favorite ? blackHeartIcon : whiteHeartIcon }
                      alt="favoriteIcon"
                    />
                  </button>
                </div>
              );
            })
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ recomendationsReducer }) => ({
  valueCopied: recomendationsReducer.copy,
});

const mapDispatchToProps = (dispatch) => ({
  executeCopy: (value) => dispatch(copyButton(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipe);

FavoriteRecipe.propTypes = {
  executeCopy: PropTypes.func.isRequired,
  valueCopied: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
