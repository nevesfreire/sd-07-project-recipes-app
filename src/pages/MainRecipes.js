import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import FoodTypeSelector from '../components/CategorySelector';
// import { fetchDrinkRecipes } from '../redux/actions';

class MainRecipes extends React.Component {
  // componentDidMount() {
  //   const { fetchDrink } = this.props;
  //   const test = fetchDrink('search.php?s=');
  // }

  render() {
    const { mealRecipes } = this.props;
    if (mealRecipes.length === 1 && mealRecipes[0].idMeal !== '52968') {
      const { idMeal } = mealRecipes[0];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    }

    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Comidas" search="meals" />
        <FoodTypeSelector search="meals" />
        <RecipesList search="meals" />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { mealRecipes } }) => (
  { mealRecipes }
);

// const mapDispatchToProps = (dispatch) => ({
//   fetchDrink: (e) => dispatch(fetchDrinkRecipes(e)),
// });

MainRecipes.propTypes = {
  mealRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(MainRecipes);
