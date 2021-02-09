import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../Context/Context';

function Card({ name, thumb, index, id, type }) {
  const { setTypeAndIdDetails } = useContext(RecipeContext);
  return (
    <div className="cardContainer">
      <div className="itemCard">
        <Link to={ `/${type}/${id}` }>
          <div
            onKeyDown=""
            role="button"
            tabIndex="0"
            onClick={ () => setTypeAndIdDetails({
              type,
              id,
            }) }
            data-testid={ `${index}-recipe-card` }
          >
            <p className="textCard" data-testid={ `${index}-card-name` }>{ name }</p>
            <img
              className="itemImage "
              src={ thumb }
              alt={ name }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
