import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsIngredients } from '../services/api';

export default function ComidasIngrediente() {
  const {
    isFetching,
    setIsFetching,
    cards,
    setCards,
    mealIngredient,
    setMealIngredient,
    chosenMealIngrEndpoint,
    setChosenMealIngrEndpoint,
    setSearchCards,
  } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    const getMealsIngredients = async () => {
      setCards(await fetchMealsIngredients());
      setIsFetching(false);
    };
    getMealsIngredients();
  }, [setCards, setIsFetching]);

  console.log(cards);

  const zero = 0;
  const doze = 12;

  const handleClick = (e) => {
    setCards([]);
    setMealIngredient(e);
    setChosenMealIngrEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngredient}`);
    history.push('/comidas');
  };

  useEffect(() => {
    const getFetchChosenIngredient = async () => {
      const { meals } = await fetch(
        chosenMealIngrEndpoint,
      ).then((response) => response.json());
      setSearchCards(meals);
      console.log(meals);
    };
    getFetchChosenIngredient();
  }, [chosenMealIngrEndpoint, mealIngredient, setChosenMealIngrEndpoint, setSearchCards]);

  if (isFetching) return <h5>Carregando...</h5>;
  return (
    <div>
      <Header />
      {cards.slice(zero, doze).map((meal, index) => (
        <Card
          key={ index }
          style={ { width: '18rem' } }
          data-testid={ `${index}-ingredient-card` }
          value={ `${meal.strIngredient}` }
          onClick={ (e) => handleClick(e.target.value) }
        >
          <Card.Img
            variant="top"
            src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title
              data-testid={ `${index}-card-name` }
            >
              { `${meal.strIngredient}` }
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
