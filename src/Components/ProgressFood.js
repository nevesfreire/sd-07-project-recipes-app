import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copiedLink from 'clipboard-copy';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { checkedIsTreu } from '../helpers';

const ProgressFood = ({ type, recipe, ingredientes, id }) => {
  const [favorited, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  const [allChecked, setAllChecked] = useState(false);

  const iconFavorite = favorited ? blackHeartIcon : whiteHeartIcon;
  const name = type === 'comida' && 'strMeal';
  const image = `${name}Thumb`;

  const progressFunc = (meals) => {
    if (meals[id]) {
      const timeToRender = 620;
      setTimeout(() => {
        const nodeListForAllCheckeBox = document.querySelectorAll('input');
        const arrayForAllCheckeBox = [];
        nodeListForAllCheckeBox.forEach((item) => arrayForAllCheckeBox.push(item));
        arrayForAllCheckeBox.forEach((element) => {
          element.checked = meals[id].includes(element.id);
        });
      }, timeToRender);
    }
  };

  useEffect(() => {
    if (verifyLocalFav) {
      const searchFav = JSON.parse(verifyLocalFav).some(({ id: favId }) => favId === id);
      setFavorite(searchFav);
    }
    if (inProgressRecipes) {
      const { meals } = JSON.parse(inProgressRecipes);
      progressFunc(meals);
    }
  }, []);

  const handleCopy = () => {
    copiedLink(`http://localhost:3000/${type}s/${id}`);
    if (copied) setCopied(false);
    else setCopied(true);
  };

  return (
    <div>

      <img
        data-testid="recipe-photo"
        src={ recipe[image] }
        alt="Thumb Food"
        width="400"
      />
      <h2 data-testid="recipe-title">{recipe[name]}</h2>
      { copied && <p className="copy-feedback">Link copiado!</p>}
      <button type="button" data-testid="share-btn" onClick={ handleCopy }>
        <img src={ ShareIcon } alt="thumbShare" />
      </button>
      <button type="button">
        <img src={ iconFavorite } data-testid="favorite-btn" alt="thumbFavorite" />
      </button>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic || recipe.strCategory}</h3>
      {ingredientes.map((ingrediente, index) => (
        <label
          htmlFor={ `${index}-ingredient-step` }
          key={ ingrediente }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `${index}-ingredient-step` }
            name={ ingrediente }
            onClick={ (event) => checkedIsTreu(event, setAllChecked, id) }
          />
          {ingrediente}
        </label>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      { allChecked ? (
        <Link to="/receitas-feitas">
          <button type="button" data-testid="finish-recipe-btn">
            Finalizado!
          </button>
        </Link>)
        : (
          <button
            disabled="disabled"
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizado!
          </button>
        )}
    </div>
  );
};

ProgressFood.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
  ingredientes: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProgressFood;
