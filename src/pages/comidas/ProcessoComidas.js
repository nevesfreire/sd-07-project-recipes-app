import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { fetchFoodId } from '../../services';
import shareIcon from '../../images/shareIcon.svg';
import Checkcomp from '../../components/Checkcomp';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

class ProcessoComidas extends Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.finalizar = this.finalizar.bind(this);
    this.lista = this.lista.bind(this);
    this.att = this.att.bind(this);
    this.favorit = this.favorit.bind(this);
    this.componentDidMount2 = this.componentDidMount2.bind(this);
    this.api = this.api.bind(this);
    const feitas = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!feitas) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const verifivarInProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!verifivarInProgresso) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }),
      );
    }
    const { match: { params } } = this.props;
    const inProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgresso.meals) {
      if (!inProgresso.meals[params.id]) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({
            ...inProgresso,
            meals: { ...inProgresso.meals, [params.id]: [] },
          }),
        );
      }
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...inProgresso,
          meals: { [params.id]: [] },
        }),
      );
    }
    const pro = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const pro2 = pro.meals[params.id];
    this.state = {
      receita: {},
      favorito: false,
      mensagem: null,
      but: pro2,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.api(params.id);
    this.componentDidMount2(params.id);
  }

  finalizar() {
    const { receita } = this.state;
    const { history } = this.props;
    const receitafinalizada = {
      id: receita.idMeal,
      type: 'comida',
      area: receita.strArea,
      category: receita.strCategory,
      alcoholicOrNot: '',
      name: receita.strMeal,
      image: receita.strMealThumb,
      doneDate: Date(),
      tags: [...receita.strTags],
    };
    const feitas = JSON.parse(localStorage.getItem('doneRecipes'));
    feitas.push(receitafinalizada);
    localStorage.setItem('doneRecipes', JSON.stringify(feitas));
    history.push('/receitas-feitas');
  }

  async api(id) {
    const api = await fetchFoodId(id, 'comidas');
    this.setState({ receita: api.meals[0] });
  }

  componentDidMount2(id) {
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (store) {
      const favorito = store.filter((element) => (element.id === id));
      if (favorito.length) { this.setState({ favorito: true }); } else {
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
          if (store[index] === favorito[inicial]) { indexfavorito = index; }
        }
        store.splice(indexfavorito, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(store));
        this.setState({ favorito: false });
      }
    }
  }

  copy() {
    const urlarray = window.location.href.split('/');
    const url = `${urlarray[0]}//${urlarray[2]}/${urlarray[3]}/${urlarray[4]}`;
    const time = 2000;
    clipboardCopy(url);
    this.setState({ mensagem: 'Link copiado!' });
    setInterval(() => this.setState({ mensagem: null }), time);
  }

  att(value) { this.setState({ but: value }); }

  lista() {
    const { receita } = this.state;
    const { match: { params } } = this.props;
    const inProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const list = inProgresso.meals[params.id];
    const keys = Object.entries(receita);
    const ingredientes = [];
    keys.forEach((key) => {
      if (key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null) {
        ingredientes.push(key[1]);
      }
    });
    const controle = [];
    const zero = 0;
    ingredientes.forEach((key, index) => {
      controle[index] = false;
      for (let ind = zero; ind < list.length; ind += 1) {
        if (key === list[ind]) {
          controle[index] = true;
        }
      }
    });
    const metricas = [];
    keys.forEach((key) => {
      if (key[0].includes('Measure') && key[1] !== '') { metricas.push(key[1]); }
    });
    return (ingredientes.map((ingrediente, index) => (
      <Checkcomp
        call={ this.att }
        tip="meals"
        id={ params.id }
        key={ index }
        ing={ ingrediente }
        ind={ index }
        med={ metricas[index] }
        ctrl={ controle }
      />
    )));
  }

  render() {
    const { receita, favorito, mensagem, but } = this.state;
    const keys = Object.entries(receita);
    const tamanho2 = keys.filter((key) => (
      key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null
    ));
    const buton = but.length === tamanho2.length;
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
            this.lista()
          }
        </div>
        <div>
          <p data-testid="instructions">{receita.strInstructions}</p>
        </div>
        <button
          className="footer btn btn-danger"
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ !buton }
          onClick={ () => this.finalizar() }
        >
          Finalizar receita
        </button>
      </div>
    );
  }
}

ProcessoComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.objectOf().isRequired,
};
export default ProcessoComidas;
