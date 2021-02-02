import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadRecipes } from '../../redux/action';
import { /* fetchFood, fetchArea, */ fetchListArea } from '../../services';
import Header from '../../components/header';
import Footer from '../../components/footer';

class Origem extends Component {
  constructor() {
    super();
    this.state = {
      lista: {},
    };
    this.origemArea();
    this.handleClick = this.handleClick.bind(this);
    this.Meals = this.Meals.bind(this);
    /* this.handleChange = this.handleChange.bind(this); */
    this.dropdown = this.dropdown.bind(this);
    this.origemArea = this.origemArea.bind(this);
  }

  componentDidMount() {
    const { loadrecipes } = this.props;
    loadrecipes('comidas');
  }

  handleClick(valor) {
    const { history } = this.props;
    history.push(`/comidas/${valor}`);
  }

  /* async handleChange(valor) {
    const { match, setfilterrecipes, loadrecipes } = this.props;
    const { origem } = this.state;
    if (origem !== valor && valor !== 'All') {
      this.setState({
        origem: valor,
      });
      let filterOrigem;
      if (match.path[1] === 'c') {
        filterOrigem = await fetchFood(valor, 'comidas');
      } else {
        filterOrigem = await fetchArea(valor, 'comidas');
      }
      setfilterrecipes(filterOrigem);
    } else {
      if (match.path[1] === 'c') {
        loadrecipes('comidas');
      } else {
        loadrecipes('bebidas');
      }
      this.setState({
        origem: 'All',
      });
    }
  } */

  async origemArea() {
    const listArea = await fetchListArea();
    this.setState({ lista: listArea });
  }

  async dropdown() {
    const { lista } = this.state;
    console.log(lista);
    return (lista.meals.map((area, index) => (
      <option
        key={ index }
      >
        {area}
      </option>
    )));
  }

  Meals() {
    const { history, receitas } = this.props;
    let controlealert = false;
    if (receitas.meals || receitas.meals === null) {
      if (receitas.meals === null && !controlealert) {
        controlealert = true;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (receitas.meals.length === 1 && receitas.redirect) {
        const id = receitas.meals[0].idMeal;
        history.push(`/comidas/${id}`);
      } else {
        return (receitas.meals.map((receita, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <button
                className="card"
                name={ receita.idMeal }
                type="button"
                onClick={ ({ target }) => this.handleClick(target.name) }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card"
                  name={ receita.idMeal }
                  data-testid={ `${index}-card-img` }
                  src={ receita.strMealThumb }
                  alt="imagem da receita"
                />
                <h1
                  className="card"
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
  }

  render() {
    const { history, match } = this.props;
    const { lista } = this.state;
    return (
      <div>
        <Header
          title="Explorar Origem"
          history={ history }
          match={ match }
        />
        <select
          name="Selecione a Origem"
          data-testid="explore-by-area-dropdown"
        >
          <option value="All">All</option>
          {
            lista.meals
              ? this.dropdown()
              : null
          }
        </select>

        {
          this.Meals()
        }
        <Footer history={ history } />
      </div>
    );
  }
}

Origem.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.objectOf().isRequired,
  receitas: PropTypes.objectOf().isRequired,
  loadrecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
});

const mapDispatchToProps = (dispatch) => ({
  loadrecipes: (e) => dispatch(loadRecipes(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Origem);
