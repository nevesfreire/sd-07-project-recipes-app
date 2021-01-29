import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import BarraBuscaComidas from '../../components/searchbar/BarraBuscaComidas';
import Footer from '../../components/footer/Footer';

class Comidas extends Component {
  constructor() {
    super();
    this.createCard = this.createCard.bind(this);
  }

  createCard() {
    // const { resultApi } = this.props;
    // const DOZE = 12;
    // resultApi.map((food, index) => (
    //   index < DOZE ? <div
    //     key={ food.idMeal }
    //     data-testid={ `${index}-recipe-card` }
    //   >
    //     <img
    //       scr={ food.strMealThumb }
    //       alt={ food.strMeal }
    //       data-testid={ `${index}-card-img` }
    //     />
    //     <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
    //   </div> : ''
    // ));
    console.log('hello');
  }

  render() {
    const { toggle, history, resultApi } = this.props;
    console.log(resultApi);
    return (
      <div>
        <Header title="Comidas" />
        {toggle && <BarraBuscaComidas history={ history } />}
        <div>
          {resultApi.length > 1 ? this.createCard() : ''}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.reducerSearchBar.toggle,
  resultApi: state.reducerComidas.recipesByName,
});

export default connect(mapStateToProps)(Comidas);

Comidas.propTypes = {
  toggle: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resultApi: PropTypes.arrayOf(PropTypes.object).isRequired,
};
