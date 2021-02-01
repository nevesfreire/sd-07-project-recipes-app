import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaComidas from '../../components/searchbar/BarraBuscaComidas';
import Footer from '../../components/footer/Footer';
import { resultRandomFood } from '../../redux/actionsComidas';

class Comidas extends Component {
  constructor() {
    super();
    this.showCards = this.showCards.bind(this);
  }

  componentDidMount() {
    const { fetchRandomFood } = this.props;
    fetchRandomFood();
  }

  showCards(card) {
    return card.map((food, index) => {
      const DOZE = 12;
      if (index < DOZE) {
        return (
          <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
            <img
              src={ food.strMealThumb }
              alt="recipe pic"
              data-testid={ `${index}-card-img` }
              width="50%"
            />
            <h4 data-testid={ `${index}-card-name` }>{food.strMeal}</h4>
          </div>
        );
      }
      return null; // referência: Brenda Lima;
    });
  }

  render() {
    const { toggle, history, toggleFood, resultApiByName, resultFood } = this.props;
    return (
      <div>
        <Header title="Comidas" history={ history } />
        {toggle && <BarraBuscaComidas history={ history } />}
        {toggleFood ? this.showCards(resultApiByName) : this.showCards(resultFood)}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
  toggleFood: state.reducerSearchBar.toggleFood,
  resultFood: state.reducerComidas.recipesByRadomFood,
  resultApiByName: state.reducerComidas.recipesByName,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRandomFood: () => dispatch(resultRandomFood()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);

Comidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  toggleFood: PropTypes.bool.isRequired,
  resultFood: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRandomFood: PropTypes.func.isRequired,
  resultApiByName: PropTypes.arrayOf(PropTypes.object).isRequired,
};
