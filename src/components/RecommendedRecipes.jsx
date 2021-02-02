import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { RecipeContext } from '../context/RecipeContext';
import '../pages/RecipeDetails.css';

function RecommendedRecipes({ path }) {
  const {
    setRecipe,
    recommended,
    setRecommended,
  } = useContext(RecipeContext);

  const renderRecommended = (item, index, carousel) => {
    let recipeName = item.strMeal;
    let img = item.strMealThumb;
    let recipeId = item.idMeal;
    let recipeCategory = item.strCategory;
    let redirect = `/comidas/${recipeId}`;
    let number = index;
    if (path.includes('comida')) {
      recipeName = item.strDrink;
      img = item.strDrinkThumb;
      recipeId = item.idDrink;
      recipeCategory = item.strAlcoholic;
      redirect = `/bebidas/${recipeId}`;
    }
    if (carousel) number = index + carousel;
    return (
      <Link
        key={ recipeId }
        to={ redirect }
        onClick={ () => {
          setRecipe([]);
          setRecommended([]);
        } }
      >
        <Card
          className="recommendation-card"
          data-testid={ `${number}-recomendation-card` }
        >
          <div
            className="recommendation-image-container"
          >
            <Card.Img
              variant="top"
              src={ img }
            />
          </div>
          <Card.Body
            className="recommendation-body"
          >
            <Card.Subtitle
              className="recommendation-subtitle text-muted"
            >
              { recipeCategory }
            </Card.Subtitle>
            <Card.Title
              className="recommendation-title"
              data-testid={ `${number}-recomendation-title` }
            >
              { recipeName }
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    );
  };

  const carousel2 = 2;
  const carousel3 = 4;

  return (
    <Carousel>
      <Carousel.Item>
        { recommended[0].map((item, index) => renderRecommended(item, index)) }
      </Carousel.Item>
      <Carousel.Item>
        { recommended[1].map((item, index) => (
          renderRecommended(item, index, carousel2))) }
      </Carousel.Item>
      <Carousel.Item>
        { recommended[2].map((item, index) => (
          renderRecommended(item, index, carousel3))) }
      </Carousel.Item>
    </Carousel>
  );
}

export default RecommendedRecipes;

RecommendedRecipes.propTypes = {
  path: propTypes.string,
}.isRequired;