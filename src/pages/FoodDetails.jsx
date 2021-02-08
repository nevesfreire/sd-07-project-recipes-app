import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';

export default function FoodDetails(props) {
  const {
    fetchMealId,
    isFetching,
    mealDescription: { meals },
    recomendation: { drinks },
  } = useContext(RecipesContext);

  const zero = 0;
  const seis = 6;

  useEffect(() => {
    const { id } = props.match.params;
    fetchMealId(id, 'comida');
  }, []);

  const listIgredient = () => {
    const list = [];
    const mealsReceived = meals[0];

    for (let index = 1; mealsReceived[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`
      ${mealsReceived[`strIngredient${index}`]} - ${mealsReceived[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  if (isFetching || meals === undefined) return <span>Carregando...</span>;

  return (
    <div className="recipes-details-body">
      <img
        className="img-recipes-details"
        data-testid="recipe-photo"
        alt="Imagem da receita"
        src={ meals[0].strMealThumb }
      />
      <p data-testid="recipe-title">{meals[0].strMeal}</p>
      <div>
        <button
          data-testid="share-btn"
          type="button"
          className="btn btn-outline-warning color-button"
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          className="btn btn-outline-warning color-button"
        >
          Favoritar
        </button>
        <p data-testid="recipe-category">{meals[0].strCategory}</p>
        <ol className="list-ingredients">
          {listIgredient().map((content, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {content}
            </li>
          ))}
        </ol>
        <p data-testid="instructions">
          {meals[0].strInstructions}
        </p>
        <iframe
          className="img-recipes-details"
          data-testid="video"
          title={ meals[0].strMeal }
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={ meals[0].strYoutube }
          frameBorder="0"
        />
        <Carousel>
          {drinks.map((drinkRecomendation, index) => (
            <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
              <img
                className="img-recipes-details"
                alt="Recomendation"
                src={ drinkRecomendation.strDrinkThumb }
              />
              <Carousel.Caption>
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drinkRecomendation.strDrink}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )).slice(zero, seis)}
        </Carousel>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn btn-outline-warning recipes-start color-button"
        >
          Iniciar receita
        </button>
      </div>
    </div>
  );
}
FoodDetails.propTypes = {
  match: PropTypes.elementType.isRequired,
};
