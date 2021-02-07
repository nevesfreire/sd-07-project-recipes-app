import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function CardAll({ FoodOrDrink }) {
  const [favorited, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const iconFavorite = favorited ? blackHeartIcon : whiteHeartIcon;

  const handleDeslike = (id) => {
    if (favorited) {
      // const newFavorite = FoodOrDrink.filter(
      //   (foodsOrDrinks) => foodsOrDrinks.id !== id,
      // );
      // setRenderAll(newFavorite);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(...newFavorite));
      return setFavorite(false);
    }
    return setFavorite(true);
  };

  const handleCopy = (type, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  return (
    FoodOrDrink
    && FoodOrDrink.map((foodAndDrink, index) => (
      <div key={ foodAndDrink.id } className="done-card">
        <Link to={ `/${foodAndDrink.type}s/${foodAndDrink.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="card-img"
            src={ foodAndDrink.image }
            alt="Imagem do produto"
          />
        </Link>
        <div className="done-card-infos">
          <h4 data-testid={ `${index}-horizontal-name` } className="done-card-title">
            {foodAndDrink.name}
          </h4>
          <h4
            data-testid={ `${index}-horizontal-top-text` }
            className="done-card-subtitle"
          >
            {`${foodAndDrink.area || foodAndDrink.alcoholicOrNot} - ${
              foodAndDrink.category
            }`}
          </h4>
          {foodAndDrink.doneDate && (
            <h4
              data-testid={ `${index}-horizontal-done-date` }
              className="done-card-date"
            >
              Done:
              {' '}
              {foodAndDrink.doneDate}
            </h4>
          )}
          {foodAndDrink.tags
              && foodAndDrink.tags.map((tag, indexs) => (
                <h4 key={ indexs } data-testid={ `${index}-${tag}-horizontal-tag` } className="done-card-date">
                  { indexs <= 0 && 'Tags: '}
                  {tag}
                  { indexs > 0 && ' | '}
                </h4>
              ))}
        </div>
        <div className="done-button-icons">
          <label htmlFor="btn-copied">
            {copied && <p className="copy-feedback">Link copiado!</p>}
            <button
              type="button"
              name="btn-copied"
              onClick={ () => handleCopy(foodAndDrink.type, foodAndDrink.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="icone de compartilhar"
              />
            </button>
          </label>
          <button
            type="button"
            onClick={ ({ target }) => handleDeslike(target.name) }
          >
            <img
              src={ iconFavorite }
              data-testid={ `${index}-horizontal-favorite-btn` }
              name={ foodAndDrink.id }
              alt="icone de desfavoritar"
            />
          </button>
        </div>
      </div>
    ))
  );
}

export default CardAll;
