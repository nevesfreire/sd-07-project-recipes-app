import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import DoneRecipesCard from './DoneRecipesCard';

class DoneRecipesList extends Component {
  render() {
    const { filterRecipes } = this.props;
    return (
      <div className="recipes-list">
        <Row>
          {filterRecipes().map((recipe, recipeIndex) => (
            <DoneRecipesCard
              key={ recipe.id }
              recipe={ recipe }
              recipeIndex={ recipeIndex }
            />
          ))}
        </Row>
      </div>
    );
  }
}

DoneRecipesList.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
};

export default DoneRecipesList;
