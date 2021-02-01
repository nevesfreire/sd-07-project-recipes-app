import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import ReactPlayer from 'react-player';
import Footerdetails from '../../components/footerdetails';
import { fetchFoodId } from '../../services';
import { loadRecipes } from '../../redux/action';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// problema no filtro??
class DetalhesComidas extends Component {
  constructor() {
    super();
    this.api = this.api.bind(this);
    this.favorit = this.favorit.bind(this);
    this.Meals = this.Meals.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.copy = this.copy.bind(this);
    this.componentDidMount2 = this.componentDidMount2.bind(this);
    this.state = {
      receita: {},
      favorito: false,
      mensagem: null,
    };
    const feitas = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!feitas) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { loadrecipes } = this.props;
    loadrecipes('bebidas');
    this.api(params.id);
    this.componentDidMount2(params.id);
  }

  async handleClick(valor) {
    const { history } = this.props;
    await history.push(`/bebidas/${valor}`);
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
    if (recomenda.drinks) {
      return (recomenda.drinks.map((receita, index) => {
        const limit = 6;
        if (index < limit) {
          return (
            <div key={ index } className="card">
              <button
                name={ receita.idDrink }
                type="button"
                onClick={ ({ target }) => this.handleClick(target.name) }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  data-testid={ `${index}-recomendation-img` }
                  name={ receita.idDrink }
                  src={ receita.strDrinkThumb }
                  alt="imagem da receita"
                />
              </button>
              <h1
                data-testid={ `${index}-recomendation-title` }
                name={ receita.idDrink }
              >
                {receita.strDrink}
              </h1>
            </div>
          );
        }
        return null;
      }));
    }
  }

  copy() {
    const time = 3000;
    clipboardCopy(window.location.href);
    this.setState({ mensagem: 'Link copiado!' });
    setInterval(() => this.setState({ mensagem: null }), time);
  }

  render() {
    const { history } = this.props;
    const { receita, favorito, mensagem } = this.state;
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
          onClick={ () => this.copy() }
        />
        {mensagem}
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
              if (ingrediente[1] !== '' && ingrediente[1] !== null) {
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
          data-testid="video"
          url={ receita.strYoutube }
        />
        <div className="carousel scroller">
          {
            this.Meals()
          }
        </div>
        {
          feito.length
            ? null
            : <Footerdetails pa="C" id={ receita.idMeal } hi={ history } />
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
