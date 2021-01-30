import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { StorageContext } from '../providers/AllProviders';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const Details = ({ type, recipe, recommend, ingredientes, id }) => {
  const { addFavorite, removeFavorite } = useContext(StorageContext);
  const [favorited, setFavorite] = useState(false);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');

  const iconFavorite = favorited ? blackHeartIcon : whiteHeartIcon;
  const image = type === 'comida' ? 'strMealThumb' : 'strDrinkThumb';
  const name = type === 'comida' ? 'strMeal' : 'strDrink';
  const rcmdImg = type === 'comida' ? 'strDrinkThumb' : 'strMealThumb';
  const rcmdTitle = type === 'comida' ? 'strDrink' : 'strMeal';

  useEffect(() => {
    if (verifyLocalFav) {
      const searchFav = JSON.parse(verifyLocalFav).some(({ id: favId }) => favId === id);
      console.log('rodei:', searchFav);
      setFavorite(searchFav);
    }
  }, []);

  const handleFavorite = () => {
    if (!favorited) {
      addFavorite(recipe, name, id, type);
      return setFavorite(!favorited);
    }
    removeFavorite(id);
    return setFavorite(!favorited);
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
      <button type="button">
        <img src={ ShareIcon } data-testid="share-btn" alt="thumbShare" />
      </button>
      <button type="button" onClick={ handleFavorite }>
        <img src={ iconFavorite } data-testid="favorite-btn" alt="thumbFavorite" />
      </button>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic || recipe.strCategory}</h3>
      {ingredientes.map((ingrediente, index) => (
        <p key={ ingrediente } data-testid={ `${index}-ingredient-name-and-measure` }>
          {ingrediente}
        </p>))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {type === 'comida' && <iframe
        data-testid="video"
        title="recipe"
        width="560"
        height="315"
        src={ recipe.strYoutube && recipe.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allowFullScreen
      />}
      <Carousel>
        { recommend.map((card, index) => (
          <Carousel.Item key={ card[rcmdTitle] }>
            <div data-testid={ `${index}-recomendation-card` }>
              <img src={ card[rcmdImg] } alt="Recommended thumb" width="70" />
              <p data-testid={ `${index}-recomendation-title` }>{ card[rcmdTitle] }</p>
            </div>
            { !index && (
              <div data-testid="1-recomendation-title">
                <img src={ recommend[1][rcmdImg] } alt="Recommended thumb" width="70" />
                <p data-testid="1-recomendation-title">{ recommend[1][rcmdTitle] }</p>
              </div>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { display: 'none' } }
      >
        comecar receita
      </button>
    </div>);
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
  }).isRequired,
  recommend: PropTypes.arrayOf(PropTypes.object).isRequired,
  ingredientes: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
