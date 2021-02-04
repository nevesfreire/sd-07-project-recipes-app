import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copiedLink from 'clipboard-copy';
import { StorageContext } from '../providers/AllProviders';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './Details.css';

const Details = ({ type, recipe, recommend, ingredientes, id, medidas }) => {
  const history = useHistory();
  const { addFavorite, removeFavorite } = useContext(StorageContext);
  const [favorited, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');

  const iconFavorite = favorited ? blackHeartIcon : whiteHeartIcon;
  const name = type === 'comida' ? 'strMeal' : 'strDrink';
  const rcmdName = type === 'comida' ? 'strDrink' : 'strMeal';
  const image = `${name}Thumb`;
  const rcmdImg = `${rcmdName}Thumb`;

  useEffect(() => {
    if (verifyLocalFav) {
      const searchFav = JSON.parse(verifyLocalFav).some(
        ({ id: favId }) => favId === id,
      );
      setFavorite(searchFav);
    }
  }, []);

  const handleFavorite = () => {
    if (!favorited) {
      const atributes = { name, id, type };
      addFavorite('favoriteRecipes', recipe, atributes);
      return setFavorite(true);
    }
    removeFavorite('favoriteRecipes', id);
    return setFavorite(false);
  };

  const handleCopy = () => {
    copiedLink(`http://localhost:3000/${type}s/${id}`);
    if (copied) setCopied(false);
    else setCopied(true);
  };

  const handleStartRecipe = () => {
    const today = new Date();
    const doneDate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
    const novatag = recipe.strTags;
    const tags = novatag && novatag.split(',');
    const atributes = { name, id, type, doneDate, tags };
    history.push(`/${type}s/${id}/in-progress`);
    addFavorite('doneRecipes', recipe, atributes);
    // removeFavorite('doneRecipes', ids);
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
      {copied && <p className="copy-feedback">Link copiado!</p>}
      <button type="button" onClick={ handleCopy }>
        <img src={ ShareIcon } data-testid="share-btn" alt="thumbShare" />
      </button>
      <button type="button" onClick={ handleFavorite }>
        <img
          src={ iconFavorite }
          data-testid="favorite-btn"
          alt="thumbFavorite"
        />
      </button>
      <h3 data-testid="recipe-category">
        {recipe.strAlcoholic || recipe.strCategory}
      </h3>
      {ingredientes.map((ingrediente, index) => (
        <p
          key={ ingrediente }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingrediente}
        </p>
      ))}
      {medidas.map((medida, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {medida}
        </p>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {type === 'comida' && (
        <iframe
          data-testid="video"
          title="recipe"
          width="560"
          height="315"
          src={
            recipe.strYoutube && recipe.strYoutube.replace('watch?v=', 'embed/')
          }
          frameBorder="0"
          allowFullScreen
        />
      )}
      <Carousel>
        {recommend.map((card, index) => (
          <Carousel.Item key={ card[rcmdName] }>
            <div data-testid={ `${index}-recomendation-card` }>
              <img src={ card[rcmdImg] } alt="Recommended thumb" width="70" />
              <p data-testid={ `${index}-recomendation-title` }>
                {card[rcmdName]}
              </p>
            </div>
            {!index && (
              <div data-testid="1-recomendation-title">
                <img
                  src={ recommend[1][rcmdImg] }
                  alt="Recommended thumb"
                  width="70"
                />
                <p data-testid="1-recomendation-title">
                  {recommend[1][rcmdName]}
                </p>
              </div>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="start-recipe"
        onClick={ handleStartRecipe }
      >
        Iniciar receita
      </button>
    </div>
  );
};

export default Details;

Details.propTypes = {
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
    strTags: PropTypes.string,
  }).isRequired,
  recommend: PropTypes.arrayOf(PropTypes.object).isRequired,
  ingredientes: PropTypes.arrayOf(PropTypes.string).isRequired,
  medidas: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
