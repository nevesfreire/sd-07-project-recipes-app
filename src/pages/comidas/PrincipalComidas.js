import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRecipes } from '../../redux/action';
import Header from '../../components/header';
import Footer from '../../components/footer';

class PrincipalComidas extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.Meals = this.Meals.bind(this);
  }

  componentDidMount() {
    const { loadrecipes, reload } = this.props;
    if (reload) {
      loadrecipes('comidas');
    }
  }

  handleClick(valor) {
    const { history } = this.props;
    history.push(`/comidas/${valor}`);
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
                type="button"
                onClick={ () => this.handleClick(receita.idMeal) }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card"
                  data-testid={ `${index}-card-img` }
                  src={ receita.strMealThumb }
                  alt="imagem da receita"
                />
                <h1
                  className="card"
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
    return (
      <div>
        <Header title="Comidas" searchOn="on" history={ history } match={ match } />
        {
          this.Meals()
        }
        <Footer history={ history } />
      </div>
    );
  }
}

PrincipalComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.objectOf().isRequired,
  receitas: PropTypes.objectOf().isRequired,
  loadrecipes: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
  reload: state.fastFood.receitas.reload,
});

const mapDispatchToProps = (dispatch) => ({
  loadrecipes: (e) => dispatch(loadRecipes(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalComidas);
