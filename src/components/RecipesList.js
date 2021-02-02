import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipesCard from './RecipesCard';

class RecipesList extends React.Component {
  render() {
    const { mealRecipes, drinkRecipes, search } = this.props;
    const maxNumber = 12;
    const startList = 0;

    if (search === 'drinks') {
      return (
        <div className="recipes-list">
          {drinkRecipes.slice(startList, maxNumber).map((recipe, index) => (
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
      <div className="recipes-list">
        {mealRecipes.slice(startList, maxNumber).map((recipe, index) => (
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
