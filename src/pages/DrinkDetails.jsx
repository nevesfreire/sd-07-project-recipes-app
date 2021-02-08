import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';

export default function DrinkDetails(props) {
  const {
    fetchMealId,
    isFetching,
    mealDescription: { drinks },
    recomendation: { meals },
  } = useContext(RecipesContext);

  const zero = 0;
  const seis = 6;

  useEffect(() => {
    const { id } = props.match.params;
    fetchMealId(id);
  }, []);

  const listIgredient = () => {
    const list = [];
    const mealsReceived = drinks[0];

    for (let index = 1; mealsReceived[`strIngredient${index}`] !== null; index += 1) {
      list
        .push(`
        ${mealsReceived[`strIngredient${index}`]} - ${mealsReceived[`strMeasure${index}`]}
        `);
    }
    return list;
  };

  if (isFetching || drinks === undefined) return <span>Carregando...</span>;

  return (
    <div className="recipes-details-body">
      <img
        className="img-recipes-details"
        data-testid="recipe-photo"
        alt="Imagem da receita"
        src={ drinks[0].strDrinkThumb }
      />
      <p data-testid="recipe-title">{drinks[0].strDrink}</p>
      <div>
        <button
          className="btn btn-outline-warning color-button"
          data-testid="share-btn"
          type="button"
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
        <p data-testid="recipe-category">{drinks[0].strAlcoholic}</p>
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
          {drinks[0].strInstructions}
        </p>
        <iframe
          data-testid="video"
          title={ drinks[0].strDrink }
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={ drinks[0].strYoutube }
          frameBorder="0"
        />
        <Carousel>
          {meals.map((mealRecomendation, index) => (
            <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
              <img
                className="img-recipes-details"
                alt="Recomendation"
                src={ mealRecomendation.strMealThumb }
              />
              <Carousel.Caption>
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {mealRecomendation.strMeal}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )).slice(zero, seis)}
        </Carousel>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn btn-outline-warning color-button recipes-start"
        >
          Iniciar receita
        </button>
      </div>
    </div>
  );
}
DrinkDetails.propTypes = {
  match: PropTypes.elementType.isRequired,
};
