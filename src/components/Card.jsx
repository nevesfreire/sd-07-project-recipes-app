import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import '../css/card.css';

const recipeImg = (recipeThumb, recipeIndex) => (
  <img
    src={ recipeThumb }
    alt="recipe-img"
    data-testid={ `${recipeIndex}-card-img` }
    className="card-image"
  />
);

const recipeTextData = (recipeName, recipeIndex) => (
  <h3
    data-testid={ `${recipeIndex}-card-name` }
    className="card-title"
  >
    {recipeName}
  </h3>
);

function Card(props) {
  const {
    id,
    pathname,
    Name,
    Thumb,
    Index,
    Test,
  } = props;

  return (
    <Paper className="paper-style" elevation={ 6 }>
      <Link to={ `${pathname}/${id}` } replace>
        <div className="image-card" data-testid={ `${Index}-${Test}` }>
          {recipeImg(Thumb, Index)}
          {recipeTextData(Name, Index)}
        </div>
      </Link>
    </Paper>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Thumb: PropTypes.string.isRequired,
  Index: PropTypes.element.isRequired,
  Test: PropTypes.string.isRequired,
};

export default Card;
