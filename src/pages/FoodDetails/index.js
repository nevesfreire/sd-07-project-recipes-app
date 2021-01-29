import React, { useContext } from 'react';
import RecipesContext from '../../providers/Context/Context';
import ShareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const FoodDetails = ({ match: { params: { id } } }) => {
  const { data } = useContext(RecipesContext);
  const inicial = 9;
  const ingrtedientsIndex = 20;
  const currentRecipe = data.find(({ idMeal }) => idMeal === id);
  const ingredientes = currentRecipe && Object.values(currentRecipe)
    .splice(inicial, ingrtedientsIndex)
    .filter((item) => item);
  // if (!ingredientes) { return (<span className="loading">Loading...</span>); }
  return (
    <div>
      { ingredientes && (
        <div>
          <img src={ currentRecipe.strMealThumb } alt="Thumb Food" />
          <h2 data-testid="recipe-title">{currentRecipe.strMeal}</h2>
          <button type="button">
            <img src={ ShareIcon } data-testid="share-btn" alt="thumbShare" />
          </button>
          <button type="button">
            <img src={ whiteHeartIcon } data-testid="favorite-btn" alt="thumbFavorite" />
          </button>
          <h3 data-testid="recipe-category">{currentRecipe.strCategory}</h3>
          {ingredientes.map((ingrediente, index) => (
            <p key={ ingrediente } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingrediente}
            </p>))}
          <p data-testid="instructions">{currentRecipe.strInstructions}</p>
          <iframe
            title="recipe"
            width="560"
            height="315"
            src={ currentRecipe.strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
          />
          {/* <button type="button" data-testid={ `${index}-recomendation-card` }>comecar receita</button> */}
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
