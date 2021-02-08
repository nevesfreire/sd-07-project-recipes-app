import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import RecipesCard from './RecipesCard';

class RecipesList extends React.Component {
  render() {
    const { mealRecipes, drinkRecipes, search } = this.props;
    const maxNumber = 12;
    const startList = 0;

    if (search === 'drinks') {
      return (
        <div className="recipes-list">
          <Row className="mb-5 ml-1">
            {drinkRecipes.slice(startList, maxNumber).map((recipe, index) => (
              <Link
                key={ recipe.idDrink }
                to={ `/bebidas/${recipe.idDrink}` }
              >
                <RecipesCard
                  key={ recipe.idDrink }
                  recipe={ recipe }
                  index={ index }
                  search="drinks"
                />
              </Link>
            ))}
          </Row>
        </div>
      );
    }

    return (
      <Row className="mb-5 ml-1">
        {mealRecipes.slice(startList, maxNumber).map((recipe, index) => (
          <Link
            key={ recipe.idMeal }
            to={ `/comidas/${recipe.idMeal}` }
          >
            <RecipesCard
              key={ recipe.idMeal }
              recipe={ recipe }
              index={ index }
              search="meals"
            />
          </Link>
        ))}
      </Row>
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
