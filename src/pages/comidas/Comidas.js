import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaComidas from '../../components/searchbar/BarraBuscaComidas';
import Footer from '../../components/footer/Footer';

class Comidas extends Component {
  render() {
    const { toggle, history, toggleFood, resultApi } = this.props;
    return (
      <div>
        <Header title="Comidas" />
        {toggle && <BarraBuscaComidas history={ history } />}
        {toggleFood && resultApi.map((food, index) => {
          const DOZE = 12;
          if (index < DOZE) {
            return (
              <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
                <img
                  src={ food.strMealThumb }
                  alt="recipe pic"
                  data-testid={ `${index}-card-img` }
                />
                <h4 data-testid={ `${index}-card-name` }>{food.strMeal}</h4>
              </div>
            );
          }
          return null; // referência: Brenda Lima;
        })}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
  resultApi: state.reducerComidas.recipesByName,
  toggleFood: state.reducerSearchBar.toggleFood,
});

export default connect(mapStateToProps)(Comidas);

Comidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resultApi: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFood: PropTypes.bool.isRequired,
};
