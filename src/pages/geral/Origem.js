import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchFood, fetchArea, fetchListArea } from '../../services';
import Header from '../../components/header';
import Footer from '../../components/footer';
import '../../App.css';

class Origem extends Component {
  constructor() {
    super();
    this.origemArea = this.origemArea.bind(this);
    this.Meals = this.Meals.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.click = this.click.bind(this);
    this.optionDinamico = this.optionDinamico.bind(this);
    this.state = {
      lista: {},
      receitas: {},
    };
  }

  componentDidMount() {
    this.origemArea();
  }

  async origemArea() {
    const listareceitas = await fetchFood();
    const listArea = await fetchListArea();
    this.setState({ lista: listArea, receitas: listareceitas });
  }

  optionDinamico() {
    const { lista } = this.state;
    return (lista.meals.map((item, index) => (
      <option
        key={ index }
        data-testid={ `${item.strArea}-option` }
        value={ item.strArea }
      >
        {item.strArea}
      </option>
    )));
  }

  async dropdown({ target }) {
    if (target.value === 'All') {
      const lista = await fetchFood();
      this.setState({ receitas: lista });
    } else {
      const lista = await fetchArea(target.value);
      this.setState({ receitas: lista });
    }
  }

  click(valor) {
    const { history } = this.props;
    history.push(`/comidas/${valor}`);
  }

  Meals() {
    const { history } = this.props;
    const { receitas } = this.state;
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
              <div className="container">
                <button
                  className="card"
                  type="button"
                  onClick={ () => this.click(receita.idMeal) }
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                >
                  <figure className="figure">
                    <img
                      className="figure-img img-fluid rounded"
                      data-testid={ `${index}-card-img` }
                      src={ receita.strMealThumb }
                      alt="imagem da receita"
                    />
                  </figure>
                  <div className="card-body">
                    <h4
                      data-testid={ `${index}-card-name` }
                    >
                      {receita.strMeal}
                    </h4>
                    <p className="card-text">
                      Some quick example text
                      to build on the card title
                      and make up the bulk of the
                      card's content.
                    </p>
                    <a
                      href={ `/comidas/${receita.idMeal}` }
                      className="btn btn-danger"
                    >
                      Go to Recipe
                    </a>
                  </div>
                </button>
              </div>
            );
          }
          return null;
        }));
      }
    }
  }

  render() {
    const { history, match } = this.props;
    const { lista, receitas } = this.state;
    const valorfalso = false;
    return (
      <div>
        <Header
          title="Explorar Origem"
          searchOn="on"
          history={ history }
          match={ match }
          categori={ valorfalso }
        />
        <div className="select">
          <select
            className="form-select"
            data-testid="explore-by-area-dropdown"
            onChange={ this.dropdown }
          >
            <option data-testid="All-option" value="All">All</option>
            {
              Object.keys(lista).length
                ? this.optionDinamico()
                : null
            }
          </select>
        </div>
        <div className="cards">
          {
            Object.keys(receitas).length
              ? this.Meals()
              : null
          }
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Origem.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.objectOf().isRequired,
};

export default Origem;
