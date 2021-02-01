import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import BarraBuscaBebidas from '../../components/searchbar/BarraBuscaBebidas';
import Footer from '../../components/footer/Footer';
import { resultRandomDrink } from '../../redux/actionsBebidas';

class Bebidas extends React.Component {
  constructor() {
    super();
    this.showCards = this.showCards.bind(this);
  }

  componentDidMount() {
    const { fetchRandomDrink } = this.props;
    fetchRandomDrink();
  }

  showCards(cards) {
    return cards.map((drink, index) => {
      const DOZE = 12;
      if (index < DOZE) {
        return (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <img
              src={ drink.strDrinkThumb }
              alt="recipe pic"
              data-testid={ `${index}-card-img` }
              width="50%"
            />
            <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
          </div>
        );
      }
      return null; // referência: Brenda Lima;
    });
  }

  render() {
    const { toggle, history, toggleDrink, resultDrink, resultApiByName } = this.props;
    return (
      <div>
        <Header title="Bebidas" history={ history } />
        {toggle && <BarraBuscaBebidas history={ history } />}
        {toggleDrink ? this.showCards(resultApiByName) : this.showCards(resultDrink)}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
  toggleDrink: state.reducerSearchBar.toggleDrink,
  resultDrink: state.reducerBebidas.recipesByRadomBebida,
  resultApiByName: state.reducerBebidas.recipesByNameBebida,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRandomDrink: () => dispatch(resultRandomDrink()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);

Bebidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  toggleDrink: PropTypes.bool.isRequired,
  resultDrink: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRandomDrink: PropTypes.func.isRequired,
  resultApiByName: PropTypes.arrayOf(PropTypes.object).isRequired,
};
