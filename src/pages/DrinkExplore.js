import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Loading from '../components/Loading';
import '../css/recipe.css';

class DrinkExplore extends Component {
  // componentDidMount() {
  //   const { requestRecipes } = this.props;
  //   const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  //   requestRecipes(endPoint);
  // }

  render() {
    const { history } = this.props;
    // if (getRecipes.drinks) {
    // const indexDrink = Math.floor(Math.random() * (getRecipes.drinks.length - 1));
    return (
      <div>
        <Header title="Explorar Bebidas" history={ history } />
        <div>
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
            onClick={ () => history.push('/bebidas/178319') }
            // .push(`/bebidas/${getRecipes.drinks[indexDrink].idDrink}`) }
          >
            Me Surpreenda!
          </button>
        </div>
        <Footer history={ history } />
      </div>
    );
    // }
    // return (
    //   <Loading />
    // );
  }
}

const mapStateToProps = ({ recipesReducer }) => ({
  getRecipes: recipesReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (endPoint) => dispatch(fetchRecipes(endPoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkExplore);

DrinkExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getRecipes: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  // requestRecipes: PropTypes.func.isRequired,
};
