import React from 'react';
import { Link } from 'react-router-dom';
import { FavoriteButton, ShareButton } from '..';

/*
    id: obj[`id${keyType}`],
    type,
    area: obj.strArea || '',
    category: obj.strCategory || '',
    alcoholicOrNot: obj.strAlcoholic || '',
    name: obj[`str${keyType}`],
    image: obj[`str${keyType}Thumb`],
*/

export default function FavoriteCards({ recipes }) {
  return (
    recipes.map((obj, index) => {
      const drink = obj.type === 'bebida';
      const route = drink ? `/bebidas/${obj.id}` : `/comidas/${obj.id}`;
      return (
        <div key={ index }>
          <Link to={ route }>
            <img
              alt="Card img"
              data-testid={ `${index}-horizontal-image` }
              src={ obj.image }
            />
          </Link>
          <div>
            <h5 data-testid={ `${index}-horizontal-top-text` }>
              {
                drink
                  ? obj.alcoholicOrNot
                  : `${obj.category} - ${obj.area}`
              }
            </h5>
            <FavoriteButton drink={ drink } id={ obj.id } />
            <ShareButton data-testid={ `${index}-horizontal-share-btn` } URL={ route } />
          </div>
          <Link to={ route }>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {obj.name}
            </h3>
          </Link>
        </div>
      );
    })
  );
}
