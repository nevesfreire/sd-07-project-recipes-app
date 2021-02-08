import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copiedLink from 'clipboard-copy';
import { StorageContext } from '../providers/AllProviders';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const ProgressDrink = ({ type, recipe, ingredientes, id, medidas }) => {
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
    copiedLink(`http://localhost:3000/${type}/${id}`);
    if (copied) setCopied(false);
    else setCopied(true);
  };

  const handleStartRecipe = () => {
    const today = new Date();
    const doneDate = today.toLocaleDateString();
    const novatag = recipe.strTags;
    const tags = novatag && novatag.split(',');
    const atributes = { name, id, type, doneDate, tags };
    addFavorite('doneRecipes', recipe, atributes);
  };

  return (
    <div>
      <div className="details-page">
        <img
          data-testid="recipe-photo"
          src={ recipe[image] }
          alt="Thumb Food"
        />
        <div className="details-info">
          <div className="hero-title">
            <h2 data-testid="recipe-title" className="recipe-title">{recipe[name]}</h2>
            <div className="buttons-hero">
              { copied && <p className="copy-feedback">Link copiado!</p>}
              <button type="button" data-testid="share-btn" onClick={ handleCopy }>
                <img src={ ShareIcon } alt="thumbShare" />
              </button>
              <button type="button" onClick={ handleFavorite }>
                <img
                  src={ iconFavorite }
                  data-testid="favorite-btn"
                  alt="thumbFavorite"
                />
              </button>
            </div>
          </div>
          <h3 className="subtitle" data-testid="recipe-category">
            { recipe.strAlcoholic || recipe.strCategory}
          </h3>
          <h3 className="ingredients-title">Ingredients</h3>
          <div className="check-ingredients ingredients-info">
            <div className="table-measures">
              <h4>Ingredient</h4>
              <h4>Measure</h4>
            </div>
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
                  className="ingredient-checkbox"
                />
                <span className="ingredient-step-info">{ingrediente}</span>
                <span className="measure-info">{medidas[index]}</span>
              </label>
            ))}
          </div>
          <h3 className="directions-title">Directions</h3>
          <div className="ingredients-info">
            <p data-testid="instructions ">{recipe.strInstructions}</p>
          </div>
          <div className="next-page-button">
            <Link to="/receitas-feitas">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ !allChecked }
                onClick={ handleStartRecipe }
              >
                Finalizar!
              </button>
            </Link>
          </div>
        </div>
      </div>
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
