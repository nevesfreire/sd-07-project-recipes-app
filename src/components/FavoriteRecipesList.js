import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import FavoriteRecipesCard from './FavoriteRecipesCard';

class FavoriteRecipesList extends Component {
  render() {
    const { filterRecipes, handleShare, deleteFavorite } = this.props;
    return (
      <div className="recipes-list">
        <Row>
          {filterRecipes().map((recipe, recipeIndex) => (
            <Link
              key={ recipe.id }
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <FavoriteRecipesCard
                key={ recipe.id }
                recipe={ recipe }
                recipeIndex={ recipeIndex }
                handleShare={ handleShare }
                deleteFavorite={ deleteFavorite }
              />
            </Link>
          ))}
        </Row>
      </div>
    );
  }
}

FavoriteRecipesList.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipesList;
