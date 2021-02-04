import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';
import './style.css';

function DetailsHeader({ details }) {
  const { category, idReceita } = useParams();

  return (
    <div className="details-header-container">
      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb || details.strMealThumb }
        alt={ details.strCategory }
        className="details-header-img"
      />
      <div className="details-header-content">
        <h3 className="details-header-title" data-testid="recipe-title">
          {details.strDrink || details.strMeal}
        </h3>
        <div className="details-header-buttons">
          <ShareButton type={ category.replace('s', '') } id={ idReceita } />
          <FavoriteButton details={ details } />
        </div>
      </div>
      <p className="details-header-footer" data-testid="recipe-category">
        {details.strAlcoholic || details.strCategory}
      </p>
    </div>
  );
}

DetailsHeader.propTypes = {
  details: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DetailsHeader;
