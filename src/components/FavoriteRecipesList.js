import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import FavoriteRecipesCard from './FavoriteRecipesCard';

class FavoriteRecipesList extends Component {
  render() {
    const { filterRecipes, deleteFavorite } = this.props;
    return (
      <div className="recipes-list">
        <Row>
          {filterRecipes().map((recipe, recipeIndex) => (
            <FavoriteRecipesCard
              key={ recipe.id }
              recipe={ recipe }
              recipeIndex={ recipeIndex }
              deleteFavorite={ deleteFavorite }
            />
          ))}
        </Row>
      </div>
    );
  }
}

FavoriteRecipesList.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipesList;
