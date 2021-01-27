import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeDetails.css';

function RecipeDetails(props) {
  // incluir header
  // ingredientes
  // cards recomendados
  const { match, history } = props;
  const { params } = match;
  const { id } = params;
  const { location } = history;
  const { pathname } = location;

  const [recipe, setRecipe] = useState([]);

  async function getRecipe() {
    if (pathname.includes('comidas')) {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      return setRecipe(meals);
    }
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return setRecipe(drinks);
  }

  useEffect(() => {
    getRecipe();
  });

  console.log(recipe);

  const renderVideo = () => (
    <Card>
      <Card.Title>Video</Card.Title>
    </Card>
  );

  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.talkwalker.com%2Fblog%2Fwhat-is-image-analysis&psig=AOvVaw0mmurp1HTOpnyFgTv9uDwg&ust=1611840901355000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjlz7edvO4CFQAAAAAdAAAAABAD"
        alt="recipe image"
        data-testid="recipe-photo"
      />
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
        } }
      >
        <Card.Title data-testid="recipe-title">Título</Card.Title>
        <div
          style={ {
            display: 'flex',
            justifyContent: 'space-evenly',
          } }
        >
          <div className="icon">
            <Image
              src={ shareIcon }
              data-testid="share-btn"
              fluid
            />
          </div>
          <div className="icon">
            <Image
              src={ whiteHeartIcon }
              data-testid="favorite-btn"
              fluid
            />
          </div>
        </div>
      </div>
      <Card.Body>
        <Card.Subtitle data-testid="recipe-category">Subtítulo</Card.Subtitle>
        <Card.Subtitle>Ingredientes</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>Teste</ListGroup.Item>
        </ListGroup>
        <Card.Subtitle>Instruções</Card.Subtitle>
        <Card.Text data-testid="instructions">
          Instruções detalhadas
        </Card.Text>
        { pathname.includes('comidas') && renderVideo() }
        <Card.Title>Recomendadas</Card.Title>
        <CardDeck>
          <Card>
            <Card.Title>Receita recomendada</Card.Title>
          </Card>
        </CardDeck>
      </Card.Body>
      <Button
        variant="success"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </Button>
    </Card>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  match: propTypes.objectOf(),
  history: propTypes.objectOf(),
}.isRequired;
