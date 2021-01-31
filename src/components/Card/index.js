import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

class Card extends Component {
  render() {
    const { name, thumb, index, id, recipeType } = this.props;
    return (
      <Link
        className="card-container"
        data-testid={ `${index}-recipe-card` }
        to={ {
          pathname: `/${recipeType}/${id}`,
        } }
      >
        {/* <div className="card-container" data-testid={ `${index}-recipe-card` }> */}
        <img
          className="image-content"
          src={ thumb }
          alt="Thumb"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{name}</span>
        {/* </div> */}
      </Link>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default Card;
