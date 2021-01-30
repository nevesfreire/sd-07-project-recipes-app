import React, { useState } from 'react';
import copy from 'clipboard-copy';

import './style.css';

import shareIcon from '../../images/shareIcon.svg';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const RecipesMade = () => {
  const [copied, setCopied] = useState(false);

  const handleClickShare = () => {
    copy(window.location.href)
      .then(() => setCopied(true))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <button type="button">All</button>
        <button type="button">Food</button>
        <button type="button">Drinks</button>
      </div>

      <div>
        {
          doneRecipes.map(({
            id, type, area, category, alcoholicOrNot, name, image, doneDate, tags,
          }, index) => (
            <article className="recipe-made-card" key={ id }>
              <img src={ image } width="200" alt="done recipe" />

              <main>
                {
                  type === 'comida'
                    ? (
                      <h2 data-testid={ `${index}-horizontal-top-text` }>
                        {`${area} - ${category}`}
                      </h2>
                    ) : (
                      <h2 data-testid={ `${index}-horizontal-top-text` }>
                        {alcoholicOrNot}
                      </h2>
                    )
                }

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ handleClickShare }
                >
                  <img src={ shareIcon } alt="share icon" />
                </button>
                { copied && 'Link copiado!' }

                <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>

                <p>{doneDate}</p>

                {
                  tags.map((tag, i) => ( 
                    <button key={ `${i}-tag` } type="button">{tag}</button>
                  ))
                }
              </main>
            </article>
          ))
        }
      </div>
    </div>
  );
};

export default RecipesMade;
