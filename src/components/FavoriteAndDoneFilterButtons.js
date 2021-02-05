import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

class FavoriteAndDoneFilterButtons extends Component {
  render() {
    const { handleFilterButton } = this.props;
    return (
      <div className="categories">
        <Row style={ { margin: 30 } }>
          <button
            name="All"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleFilterButton }
          >
            All
          </button>
          <button
            name="Food"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleFilterButton }
          >
            Food
          </button>
          <button
            name="Drinks"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleFilterButton }
          >
            Drinks
          </button>
        </Row>
      </div>
    );
  }
}

FavoriteAndDoneFilterButtons.propTypes = {
  handleFilterButton: PropTypes.func.isRequired,
};

export default FavoriteAndDoneFilterButtons;
