import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsIngredients, fetchSearchMealIngredient } from '../services/api';

export default function ComidasIngrediente() {
  const {
    isFetching,
    cards,
    setCards,
    setIsFetching,
    setMealIngredient,
    mealIngredient,
  } = useContext(RecipesContext);

  const history = useHistory();

  const getMealsIngredients = async () => {
    setCards(await fetchMealsIngredients());
    setIsFetching(false);
  };

  useEffect(() => {
    getMealsIngredients();
  }, []);

  console.log(cards);

  const zero = 0;
  const doze = 12;

  const handleMealIngrCard = async () => {
    // const result = await fetchSearchMealIngredient(mealIngredient);
    // console.log(mealIngredient);
    // console.log(result);
    history.push(`/comidas/${mealIngredient}`);
  };

  // useEffect(() => {
  //   handleMealIngrCard();
  // });

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
          onClick={ handleMealIngrCard }
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
