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
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [copied, setCopied] = useState(false);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');
  const verifyLocalDone = localStorage.getItem('doneRecipes');

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
    if (verifyLocalDone) {
      const searchDone = JSON.parse(verifyLocalDone).some(
        ({ id: doneId }) => doneId === id,
      );
      setDoneRecipe(searchDone);
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
    if (copied) return setCopied(false);
    return setCopied(true);
  };

  const handleStartRecipe = () => {
    const today = new Date();
    const doneDate = today.toLocaleDateString();
    const novatag = recipe.strTags;
    const tags = novatag && novatag.split(',');
    const atributes = { name, id, type, doneDate, tags };
    history.push(`/${type}s/${id}/in-progress`);
    addFavorite('doneRecipes', recipe, atributes);
  };

  return (
    <div className="details-page">
      <img
        data-testid="recipe-photo"
        src={ recipe[image] }
        alt="Thumb Food"
      />
      <div className="details-info">
        <div className="hero-title">
          <h2 data-testid="recipe-title">{recipe[name]}</h2>
          <p className={ copied ? 'copy-feedback' : 'copy-none' }>Link copiado!</p>
          <div className="buttons-hero">
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
          </div>
        </div>
        <h3 data-testid="recipe-category" className="subtitle">
          {recipe.strAlcoholic || recipe.strCategory}
        </h3>
        <h3 className="ingredients-title">Ingredients</h3>
        <div className="check-ingredients ingredients-info">
          <div className="table-measures">
            <h4>Ingredient</h4>
            <h4>Measure</h4>
          </div>
          {ingredientes.map((ingrediente, index) => (
            <div key={ `${ingrediente}-${index}` }>
              <span className="ingredient-step-info">{ingrediente}</span>
              <span className="measure-info">{medidas[index]}</span>
            </div>
          ))}
        </div>
        <h3 className="directions-title">Directions</h3>
        <div className="directions-info">
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        {type === 'comida' && (
          <>
            <h3 className="video-title">Video</h3>
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
          </>
        )}
        <h3 className="directions-title">Other recipes</h3>
        <Carousel>
          {recommend.map((card, index) => (
            <Carousel.Item key={ card[rcmdName] }>
              <div
                data-testid={ `${index}-recomendation-card` }
                className="carousel-card"
              >
                <img src={ card[rcmdImg] } alt="Recommended thumb" width="70" />
                <p data-testid={ `${index}-recomendation-title` }>
                  {card[rcmdName]}
                </p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        { doneRecipe
        || (
          <div className="next-page-button">
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="start-recipe"
              onClick={ handleStartRecipe }
            >
              Iniciar receita
            </button>
          </div>
        )}
      </div>
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
