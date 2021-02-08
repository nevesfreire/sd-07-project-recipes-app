import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

class RecipesCard extends React.Component {
  render() {
    const { recipe, index, search } = this.props;
    const {
      strMealThumb,
      strMeal,
      strDrinkThumb,
      strDrink,
      strIngredient1,
      strIngredient } = recipe;
    const maxNumber = 12;
    return (
      <div>
        {
          index < maxNumber && search === 'meals' ? (
            <div className="p-1" data-testid={ `${index}-recipe-card` }>
              <Card
                style={ { width: '10rem' } }
                bg="warning"
                text="dark"
              >
                <Card.Img
                  variant="top"
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Text data-testid={ `${index}-card-name` }>
                    {strMeal}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ) : null
        }
        {
          index < maxNumber && search === 'drinks' ? (
            <div className="p-1" data-testid={ `${index}-recipe-card` }>
              <Card
                style={ { width: '10rem' } }
                bg="warning"
                text="dark"
              >
                <Card.Img
                  variant="top"
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Text data-testid={ `${index}-card-name` }>
                    {strDrink}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ) : null
        }
        {
          index < maxNumber && search === 'ingredientsDrinks' ? (
            <div className="p-1" data-testid={ `${index}-ingredient-card` }>
              <Card
                style={
                  { width: '10rem' }
                }
                bg="warning"
                text="dark"
              >
                <Card.Img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Text data-testid={ `${index}-card-name` }>
                    {strIngredient1}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ) : null
        }
        {
          index < maxNumber && search === 'ingredientsMeals' ? (
            <div className="p-1" data-testid={ `${index}-ingredient-card` }>
              <Card
                style={ { width: '10rem' } }
                bg="warning"
                text="dark"
              >
                <Card.Img
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ strIngredient }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Text data-testid={ `${index}-card-name` }>
                    {strIngredient}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ) : null
        }
      </div>
    );
  }
}

RecipesCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strIngredient1: PropTypes.string,
    strIngredient: PropTypes.string,
  }).isRequired,
  search: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCard;
