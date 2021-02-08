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
    const { loadrecipes, reload } = this.props;
    if (reload) {
      loadrecipes('bebidas');
    }
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
        return (
          <div className="alert alert-danger">
            Sinto muito, não encontramos nenhuma receita para esses filtros.
          </div>
        );
      } if (receitas.drinks.length === 1 && receitas.redirect) {
        const id = receitas.drinks[0].idDrink;
        history.push(`/bebidas/${id}`);
      } else {
        return (receitas.drinks.map((receita, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <div className="container">
                <button
                  className="card"
                  type="button"
                  onClick={ () => this.handleClick(receita.idDrink) }
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                >
                  <figure className="figure">
                    <img
                      className="figure-img img-fluid rounded"
                      data-testid={ `${index}-card-img` }
                      src={ receita.strDrinkThumb }
                      alt="imagem da receita"
                    />
                  </figure>
                  <div className="card-body">
                    <h4
                      data-testid={ `${index}-card-name` }
                    >
                      {receita.strDrink}
                    </h4>
                    <p className="card-text">
                      Some quick example text
                      to build on the card title
                      and make up the bulk of the
                      card's content.
                    </p>
                    <a
                      href={ `/bebidas/${receita.idDrink}` }
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
    return (
      <div>
        <Header title="Bebidas" searchOn="on" history={ history } match={ match } />
        <div className="cards">
          {
            this.Drinks()
          }
        </div>
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
  reload: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
  reload: state.fastFood.receitas.reload,
});

const mapDispatchToProps = (dispatch) => ({
  loadrecipes: (e) => dispatch(loadRecipes(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalBebidas);
