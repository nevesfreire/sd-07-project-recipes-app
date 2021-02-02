import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import Footer from '../../components/Footer';
import * as randomDrinkAction from '../../store/ducks/exploreDrinks/actions';

class ExplorarBebidas extends Component {
  async randonId() {
    const { ExploreRandomDrinksD, history } = this.props;
    await ExploreRandomDrinksD();
    const { drinkExplore } = this.props;
    history.push(`/bebidas/${drinkExplore[0].idDrink}`);
  }

  render() {
    const { history } = this.props;
    const title = 'Explorar Bebidas';
    return (
      <div>
        <Header title={ title } />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => this.randonId() }
        >
          Me Surpreenda!
        </button>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinkExplore: state.exploreDrinks.drinks.drinks,
});

const mapDispatchToProps = {
  ExploreRandomDrinksD: randomDrinkAction.ExploreRandomDrinks,
};

ExplorarBebidas.propTypes = {
  ExploreRandomDrinksD: PropTypes.objectOf(PropTypes.string).isRequired,
  drinkExplore: PropTypes.objectOf(PropTypes.string).isRequired,
  idDrink: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarBebidas);
