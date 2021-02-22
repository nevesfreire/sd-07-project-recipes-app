import React from 'react';
import { Link } from 'react-router-dom';
import { ShareButton } from '..';
import { useDoneRecipes } from '../../hooks';

const two = 2;

export default function HorizontalCard({ filter }) {
  const { recipes } = useDoneRecipes(filter);

  return (
    recipes.map((obj, index) => {
      const drink = obj.type === 'bebida';
      const URL = drink
        ? `http://localhost:3000/bebidas/${obj.id}`
        : `http://localhost:3000/comidas/${obj.id}`;
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
                  : `${obj.area} - ${obj.category}`
              }
            </h5>
            <ShareButton data-testid={ `${index}-horizontal-share-btn` } URL={ URL } />
          </div>
          <Link to={ route }>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {obj.name}
            </h3>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{obj.doneDate}</p>
          <div>
            {
              !drink && obj.tags.filter((_, i) => two > i).map((tag, i) => (
                <span
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ i }
                >
                  {tag}
                </span>
              ))
            }
          </div>
        </div>
      );
    })
  );
}
