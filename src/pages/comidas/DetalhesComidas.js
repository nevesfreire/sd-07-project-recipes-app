import React, { Component } from 'react';
import clipboardCopy from 'clipboard-copy';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Footerdetails from '../../components/footerdetails';
import { fetchFoodId } from '../../services';
import { loadRecipes } from '../../redux/action';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

class DetalhesComidas extends Component {
  constructor() {
    super();
    this.api = this.api.bind(this);
    this.favorit = this.favorit.bind(this);
    this.Meals = this.Meals.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount2 = this.componentDidMount2.bind(this);
    this.state = {
      receita: {},
      favorito: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { loadrecipes } = this.props;
    const feitas = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!feitas) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    loadrecipes('comidas');
    this.api(params.id);
    this.componentDidMount2(params.id);
  }

  async handleClick(valor) {
    const { history } = this.props;
    await history.push(`/comidas/${valor}`);
    await this.api(valor);
    await this.componentDidMount2(valor);
  }

  async api(id) {
    const api = await fetchFoodId(id, 'comidas');
    this.setState({ receita: api.meals[0] });
  }

  componentDidMount2(id) {
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (store) {
      const favorito = store.filter((element) => (element.id === id));
      if (favorito.length) {
        this.setState({ favorito: true });
      } else {
        this.setState({ favorito: false });
      }
    }
  }

  favorit() {
    const { receita } = this.state;
    const { match: { params } } = this.props;
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const receitafavoritada = {
      id: receita.idMeal,
      type: 'comida',
      area: receita.strArea,
      category: receita.strCategory,
      alcoholicOrNot: '',
      name: receita.strMeal,
      image: receita.strMealThumb,
    };
    if (!store) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([receitafavoritada]));
      this.setState({ favorito: true });
    } else {
      const favorito = store.filter((element) => (element.id === params.id));
      if (!favorito.length) {
        console.log(favorito);
        store.push(receitafavoritada);
        localStorage.setItem('favoriteRecipes', JSON.stringify(store));
        this.setState({ favorito: true });
      } else {
        const inicial = 0;
        const negativo = -1;
        let indexfavorito = negativo;
        for (let index = inicial; indexfavorito === negativo; index += 1) {
          if (store[index] === favorito[inicial]) {
            indexfavorito = index;
          }
        }
        store.splice(indexfavorito, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(store));
        this.setState({ favorito: false });
      }
    }
  }

  Meals() {
    const { recomenda } = this.props;
    if (recomenda.meals) {
      return (recomenda.meals.map((receita, index) => {
        const limit = 6;
        if (index < limit) {
          return (
            <button
              className="cardrec"
              name={ receita.idMeal }
              type="button"
              onClick={ ({ target }) => this.handleClick(target.name) }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="cardrec"
                name={ receita.idMeal }
                data-testid={ `${index}-card-img` }
                src={ receita.strMealThumb }
                alt="imagem da receita"
              />
              <h1
                className="cardrec"
                name={ receita.idMeal }
                data-testid={ `${index}-card-name` }
              >
                {receita.strMeal}
              </h1>
            </button>
          );
        }
        return null;
      }));
    }
  }

  render() {
    const { history } = this.props;
    const { receita, favorito } = this.state;
    const feitas = JSON.parse(localStorage.getItem('doneRecipes'));
    const feito = feitas.filter((elemento) => receita.idMeal === elemento.id);
    const keys = Object.entries(receita);
    const ingredientes = keys.filter((key) => key[0].includes('strIngredient'));
    const metricas = keys.filter((key) => key[0].includes('strMeasure'));
    return (
      <div>
        <img
          src={ receita.strMealThumb }
          data-testid="recipe-photo"
          alt="foto-da comida"
        />
        <h2 data-testid="recipe-title">{receita.strMeal}</h2>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt="compartilhar"
        />
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ () => this.favorit() }
          src={ favorito ? blackHeartIcon : whiteHeartIcon }
          alt="favoritar"
        />
        <h3 data-testid="recipe-category">{receita.strCategory}</h3>
        <div>
          {
            ingredientes.map((ingrediente, index) => {
              if (ingrediente[1] !== '') {
                return (
                  <h4
                    key={ `${index}-ingredient-name-and-measure` }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`-${ingrediente[1]}-${metricas[index][1]}`}
                  </h4>
                );
              }
              return null;
            })
          }
        </div>
        <div>
          <p data-testid="instructions">{receita.strInstructions}</p>
        </div>
        <ReactPlayer
          url={ receita.strYoutube }
        />
        <div>
          {
            this.Meals()
          }
        </div>
        {
          feito
            ? null
            : <Footerdetails pa="C" ke="meals" id={ receita.idMeal } hi={ history } />
        }
      </div>
    );
  }
}

DetalhesComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.objectOf().isRequired,
  recomenda: PropTypes.objectOf().isRequired,
  loadrecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recomenda: state.fastFood.receitas,
});

const mapDispatchToProps = (dispatch) => ({
  loadrecipes: (e) => dispatch(loadRecipes(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesComidas);
