import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

class Card extends Component {
  render() {
    const {
      name, thumb, id, recipeType, testIdCard, testIdThumb, testIdTitle,
    } = this.props;
    return (
      <Link
        className="card-container"
        data-testid={ testIdCard }
        to={ {
          pathname: `/${recipeType}/${id}`,
        } }
      >
        <img
          className="image-content"
          src={ thumb }
          alt="Thumb"
          data-testid={ testIdThumb }
        />
        <span data-testid={ testIdTitle }>{name}</span>
        {/* </div> */}
      </Link>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  testIdCard: PropTypes.string.isRequired,
  testIdThumb: PropTypes.string.isRequired,
  testIdTitle: PropTypes.string.isRequired,
};

export default Card;
