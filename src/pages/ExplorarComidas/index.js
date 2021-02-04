import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import Footer from '../../components/Footer';
import * as randomFoodAction from '../../store/ducks/exploreFoods/action';

class ExplorarComidas extends Component {
  async randonId() {
    const { ExploreRandomFood, history } = this.props;
    await ExploreRandomFood();
    const { foodExplore } = this.props;
    history.push(`/comidas/${foodExplore[0].idMeal}`);
  }

  render() {
    const { history } = this.props;
    const title = 'Explorar Comidas';
    return (
      <div>
        <Header title={ title } />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
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
  foodExplore: state.exploreFoods.meals.meals,
});

const mapDispatchToProps = {
  ExploreRandomFood: randomFoodAction.ExploreRandomFood,
};

ExplorarComidas.propTypes = {
  ExploreRandomFood: PropTypes.objectOf(PropTypes.string).isRequired,
  foodExplore: PropTypes.objectOf(PropTypes.string).isRequired,
  idMeal: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidas);
