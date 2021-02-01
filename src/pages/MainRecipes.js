import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import FoodTypeSelector from '../components/CategorySelector';

class MainRecipes extends React.Component {
  render() {
    const { mealRecipes } = this.props;
    if (mealRecipes.length === 1) {
      const { idMeal } = mealRecipes[0];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    }

    return (
      <div>
        <Header shouldRenderSearchIcon="yes" pageTitle="Comidas" search="meals" />
        <div className="content">
          <FoodTypeSelector search="meals" />
          <RecipesList search="meals" />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { mealRecipes } }) => (
  { mealRecipes }
);

MainRecipes.propTypes = {
  mealRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(MainRecipes);
