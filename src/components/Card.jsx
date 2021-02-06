import React from 'react';
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
    recipeName,
    recipeThumb,
    recipeIndex,
  } = props;

  return (
    <Paper className="paper-style" elevation={ 6 }>
      <Link to={ `${pathname}/${id}` } replace>
        <div className="image-card" data-testid={ `${recipeIndex}-recipe-card` }>
          {recipeImg(recipeThumb, recipeIndex)}
          {recipeTextData(recipeName, recipeIndex)}
        </div>
      </Link>
    </Paper>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeThumb: PropTypes.string.isRequired,
  recipeIndex: PropTypes.element.isRequired,
};

export default Card;
