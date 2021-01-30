import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaBebidas from '../../components/searchbar/BarraBuscaBebidas';
import Footer from '../../components/footer/Footer';

class Bebidas extends React.Component {
  render() {
    const { toggle, history, toggleDrink, resultApi } = this.props;
    return (
      <div>
        <Header title="Bebidas" />
        {toggle && <BarraBuscaBebidas history={ history } />}
        {toggleDrink && resultApi.map((drink, index) => {
          const DOZE = 12;
          if (index < DOZE) {
            return (
              <div data-testid={ `${index}-recipe-card` } key={ drink.idMeal }>
                <img
                  src={ drink.strMealThumb }
                  alt="recipe pic"
                  data-testid={ `${index}-card-img` }
                />
                <h4 data-testid={ `${index}-card-name` }>{drink.strMeal}</h4>
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
  resultApi: state.reducerBebidas.recipesByNameBebida,
  toggleFood: state.reducerSearchBar.toggleDrink,
});

export default connect(mapStateToProps)(Bebidas);

Bebidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resultApi: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleDrink: PropTypes.bool.isRequired,
};
