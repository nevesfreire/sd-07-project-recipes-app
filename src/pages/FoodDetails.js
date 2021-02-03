import React, { useEffect, useState } from 'react';
import { Button, Form, Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FoodDetails() {
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  // const [ingredients, setIngredients] = useState([]);
  // const [measures, setMeasures] = useState([]);

  const history = useHistory();
  const zero = 0;
  const cinco = 5;
  const seis = 6;
  const path = history.location.pathname;

  useEffect(() => {
    const getRecipe = async () => {
      const id = path.substr(path.length - cinco, path.length);
      const endpoint = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipe(meals[0]);
    };
    getRecipe();
  }, [path]);

  const getRecomendations = async () => {
    const endpoint = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await fetch(endpoint).then((response) => response.json());
    const sixCards = drinks.slice(zero, seis);
    setRecomendations(sixCards);
  };

  useEffect(() => {
    getRecomendations();
  }, []);

  console.log(recipe);
  console.log(recomendations);

  return (
    <div>

      <img
        data-testid="recipe-photo"
        alt="Foto da Receita"
        src={recipe.strMealThumb}
      />

      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>

      <h3>Ingredientes</h3>

      <Form>
        {/* {ingredients.map((ingredient, index) => ( */}
        <div key="index" className="mb-3">
          <Form.Check
            type="checkbox"
            id="default-checkbox"
            label="Ingrediente - Qtd"
          />
        </div>
        {/* // ))} */}
      </Form>

      <div data-testid="0-ingredient-name-and-measure" />

      <h3>Instruções</h3>
      <span data-testid="instructions">{recipe.strInstructions}</span>

      <button
        type="button"
        data-testid="share-btn"
      >
        <img
          src={shareIcon}
          alt="Share Icon"
        />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img
          src={whiteHeartIcon}
          alt="Favorite Icon"
        />
      </button>

      <h3>Video</h3>
      <iframe
        data-testid="video"
        className="width360"
        title="video"
        src={ recipe.strYoutube && recipe.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <h3>Recomendadas</h3>

      <Carousel>

        {recomendations.map((item, index) => (

          <Carousel.Item
            key={item.idDrink}
            data-testid={`${index}-recomendation-card`}
          >
            <img
              className="d-block w-100"
              src={item.strDrinkThumb}
              alt={item.strDrink}
            />
            <Carousel.Caption>
              <h3
                data-testid={`${index}-recomendation-title`}
              >
                {item.strDrink}
              </h3>
              <h4>{item.strAlcoholic}</h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Button variant="success" data-testid="start-recipe-btn">Iniciar Receita</Button>

    </div>

  );
}
