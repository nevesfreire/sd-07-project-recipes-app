import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import { loadRecipes } from '../../redux/action';
import Footer from '../../components/footer';

class PrincipalBebidas extends Component {
  componentDidMount() {
    const { setlocal } = this.props;
    setlocal('bebidas');
  }

  Drinks() {
    const { history, receitas } = this.props;
    let controlealert = false;
    if (receitas.drinks || receitas.drinks === null) {
      if (receitas.drinks === null && !controlealert) {
        controlealert = true;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (receitas.drinks.length === 1) {
        const id = receitas.drinks[0].idDrink;
        history.push(`/bebidas/${id}`);
      } else {
        return (receitas.drinks.map((receita, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ receita.strDrinkThumb }
                  alt="imagem da receita"
                />
                <h1 data-testid={ `${index}-card-name` }>{receita.strDrink}</h1>
              </div>
            );
          }
          return null;
        }));
      }
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Bebidas" searchOn="on" history={ history } />
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
  setlocal: PropTypes.func.isRequired,
  receitas: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
});

const mapDispatchToProps = (dispatch) => ({
  setlocal: (tipo) => dispatch(loadRecipes(tipo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalBebidas);
