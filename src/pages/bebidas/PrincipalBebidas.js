import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRecipes } from '../../redux/action';
import Header from '../../components/header';
import Footer from '../../components/footer';

class PrincipalBebidas extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.Drinks = this.Drinks.bind(this);
  }

  componentDidMount() {
    const { loadrecipes } = this.props;
    loadrecipes('bebidas');
  }

  handleClick(valor) {
    const { history } = this.props;
    history.push(`/bebidas/${valor}`);
  }

  Drinks() {
    const { history, receitas } = this.props;
    let controlealert = false;
    if (receitas.drinks || receitas.drinks === null) {
      if (receitas.drinks === null && !controlealert) {
        controlealert = true;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (receitas.drinks.length === 1 && receitas.redirect) {
        const id = receitas.drinks[0].idDrink;
        history.push(`/bebidas/${id}`);
      } else {
        return (receitas.drinks.map((receita, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <button
                className="card"
                type="button"
                name={ receita.idDrink }
                onClick={ ({ target }) => this.handleClick(target.name) }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card"
                  name={ receita.idDrink }
                  data-testid={ `${index}-card-img` }
                  src={ receita.strDrinkThumb }
                  alt="imagem da receita"
                />
                <h1
                  className="card"
                  name={ receita.idDrink }
                  data-testid={ `${index}-card-name` }
                >
                  {receita.strDrink}
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
        <Header title="Bebidas" searchOn="on" history={ history } match={ match } />
        {
          this.Drinks()
        }
        <Footer history={ history } />
      </div>
    );
  }
}

PrincipalBebidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  receitas: PropTypes.objectOf().isRequired,
  match: PropTypes.objectOf().isRequired,
  loadrecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
});

const mapDispatchToProps = (dispatch) => ({
  loadrecipes: (e) => dispatch(loadRecipes(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalBebidas);
