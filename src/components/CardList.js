import React from 'react';
import PropTypes from 'prop-types';

function CardList({ arrayOfCard, typeOfCard }) {
  arrayOfCard.length = 12;
  const magicNumberZero = 0;
  const id = `id${typeOfCard}`;
  const name = `str${typeOfCard}`;
  const src = `str${typeOfCard}Thumb`;
  return (
    <div className="card-list">
      { arrayOfCard.length > magicNumberZero
      && arrayOfCard.map((item, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          className="item-card"
          key={ item[id] }
        >
          <img
            data-testid={ `${index}-card-img` }
            width="100%"
            src={ item[src] }
            alt="item"
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { item[name] }
          </h3>
        </div>
      ))}
    </div>
  );
}

CardList.propTypes = {
  arrayOfCard: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  typeOfCard: PropTypes.string.isRequired,
};

export default CardList;
