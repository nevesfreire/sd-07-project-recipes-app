import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/recipe.css';

class DrinksCategoryFilter extends Component {
  render() {
    const { getCategories } = this.props;
    const DRINK_LENGTH = 5;
    const filterArray = getCategories.drinks
      .filter((_drink, index) => index < DRINK_LENGTH);
    return (
      <div className="category-button-container">
        {filterArray.map((drink) => (
          <button
            type="button"
            key={ drink.strCategory }
            data-testid={ `${drink.strCategory}-category-filter` }
          >
            { drink.strCategory }
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  getCategories: categories.categories,
});

export default connect(mapStateToProps)(DrinksCategoryFilter);

DrinksCategoryFilter.propTypes = {
  getCategories: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
