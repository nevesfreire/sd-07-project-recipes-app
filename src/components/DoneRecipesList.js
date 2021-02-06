import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import DoneRecipesCard from './DoneRecipesCard';

class DoneRecipesList extends Component {
  render() {
    const { filterRecipes, handleShare } = this.props;
    return (
      <div className="recipes-list">
        <Row>
          {filterRecipes().map((recipe, recipeIndex) => (
            <Link
              key={ recipe.id }
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <DoneRecipesCard
                key={ recipe.id }
                recipe={ recipe }
                recipeIndex={ recipeIndex }
                handleShare={ handleShare }
              />
            </Link>
          ))}
        </Row>
      </div>
    );
  }
}

DoneRecipesList.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
};

export default DoneRecipesList;
