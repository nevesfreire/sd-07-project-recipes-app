import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StorageContext } from '../providers/AllProviders';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const ProgressDrink = ({ type, recipe, ingredientes, id }) => {
  const { addFavorite, removeFavorite } = useContext(StorageContext);
  const [favorited, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');
  const [allChecked, setAllChecked] = useState(false);

  const iconFavorite = favorited ? blackHeartIcon : whiteHeartIcon;
  const name = type === 'comida' ? 'strMeal' : 'strDrink';
  const image = `${name}Thumb`;

  useEffect(() => {
    if (verifyLocalFav) {
      const searchFav = JSON.parse(verifyLocalFav).some(({ id: favId }) => favId === id);
      setFavorite(searchFav);
    }
  }, []);

  const checkedIsTreu = () => {
    const nodeListForAllCheckeBox = document.querySelectorAll('input');
    const arrayForAllCheckeBox = [];
    nodeListForAllCheckeBox.forEach((item) => arrayForAllCheckeBox.push(item));
    if (arrayForAllCheckeBox.every((elem) => elem.checked === true)) setAllChecked(true);
    else setAllChecked(false);
  };

  const handleFavorite = () => {
    if (!favorited) {
      addFavorite(recipe, name, id, type);
      return setFavorite(true);
    }
    removeFavorite(id);
    return setFavorite(false);
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
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
      <button type="button" onClick={ handleCopy }>
        <img src={ ShareIcon } data-testid="share-btn" alt="thumbShare" />
      </button>
      <button type="button" onClick={ handleFavorite }>
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
            onClick={ () => checkedIsTreu() }
          />
          {ingrediente}
        </label>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      { allChecked && (
        <Link to="/receitas-feitas">
          <button type="button" data-testid="finish-recipe-btn">
            Finalizado!
          </button>
        </Link>) }
    </div>
  );
};

ProgressDrink.propTypes = {
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

export default ProgressDrink;
