import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipesCard from './RecipesCard';

class RecipesList extends React.Component {
  render() {
    const { mealRecipes, drinkRecipes, search } = this.props;

    if (search === 'drinks') {
      return (
        <div>
          {drinkRecipes.map((recipe, index) => (
            <RecipesCard
              key={ recipe.idDrink }
              recipe={ recipe }
              index={ index }
              search="drinks"
            />
          ))}
        </div>
      );
    }

    return (
      <div>
        {mealRecipes.map((recipe, index) => (
          <RecipesCard
            key={ recipe.idMeal }
            recipe={ recipe }
            index={ index }
            search="meals"
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { mealRecipes, drinkRecipes } }) => (
  { mealRecipes, drinkRecipes }
);

RecipesList.propTypes = {
  search: PropTypes.string.isRequired,
  mealRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  drinkRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(RecipesList);
