import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function CardAll({ FoodOrDrink, setRenderAll }) {
  const [favorited, setFavorite] = useState(true);
  const [copied, setCopied] = useState(false);
  const iconFavorite = favorited ? blackHeartIcon : whiteHeartIcon;

  useEffect(() => {
    setFavorite(true);
    setCopied(false);
  }, [FoodOrDrink]);

  const handleDeslike = (id) => {
    if (favorited) {
      const newFavorite = FoodOrDrink.filter(
        (foodsOrDrinks) => foodsOrDrinks.id !== id,
      );
      setRenderAll(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
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
      <div key={ foodAndDrink.id }>
        <Link to={ `/${foodAndDrink.type}s/${foodAndDrink.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ foodAndDrink.image }
            width="300"
            alt="Imagem do produto"
          />
          <div data-testid={ `${index}-horizontal-name` }>
            Nome:
            {' '}
            {foodAndDrink.name}
          </div>
          <div data-testid={ `${index}-horizontal-top-text` }>
            Categoria:
            {' '}
            {`${foodAndDrink.area || foodAndDrink.alcoholicOrNot} - ${
              foodAndDrink.category
            }`}
          </div>
          <div data-testid={ `${index}-horizontal-done-date` }>
            Salva:
            {' '}
            {foodAndDrink.doneDate}
          </div>
          <div>
            {foodAndDrink.tags
              && foodAndDrink.tags.map((tag, indexs) => (
                <span key={ indexs } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {' - '}
                  {tag}
                </span>
              ))}
          </div>
        </Link>
        <div>
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
