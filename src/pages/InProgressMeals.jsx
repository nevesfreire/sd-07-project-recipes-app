import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import apiTheMealDB from '../services/apiTheMealDB';

class InProgressMeals extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: '',
      ingredientsList: [],
      ingrentsMeasuresList: [],
    };
    this.maracutaia = this.maracutaia.bind(this);
    this.callRecipeAPI = this.callRecipeAPI.bind(this);
  }

  async componentDidMount() {
    await this.callRecipeAPI();
    this.maracutaia();
  }

  async callRecipeAPI() {
    const magicThree = 3;
    const localData = localStorage.getItem('inProgressMealRecipe');
    console.log(localData);
    if (localData === null) {
      const urlParams = window.location.pathname.split('/', magicThree).pop();
      const recipe = await apiTheMealDB(`lookup.php?i=${urlParams}`);
      this.setState({
        recipe: recipe.meals[0],
      });
      return localStorage
        .setItem('inProgressMealRecipe', JSON.stringify(recipe.meals[0]));
    }
    this.setState({ recipe: JSON.parse(localData) });
  }

  maracutaia() {
    const { recipe } = this.state;
    const ingredientsList = [];
    const ingrentsMeasuresList = [];
    Object.entries(recipe).filter((item) => (
      (item[0].includes('strIngredient') && item[1] !== '' && item[1] !== null)
      && ingredientsList.push(item[1])
    ));
    Object.entries(recipe).filter((item) => (
      (item[0].includes('strMeasure') && item[1] !== ' ' && item[1] !== null)
       && ingrentsMeasuresList.push(item[1])
    ));
    this.setState({ ingredientsList, ingrentsMeasuresList });
  }

  render() {
    const { ingredientsList, ingrentsMeasuresList, recipe } = this.state;
    if (recipe === '') {
      return <p>Loading...</p>;
    }
    return (
      <Container fluid>
        <Col>
          <img
            src={ recipe.strMealThumb }
            style={ { width: '20%' } }
            data-testid="recipe-photo"
            alt="someAlt"
          />
        </Col>
        <h3
          data-testid="recipe-title"
        >
          {recipe.strMeal}
        </h3>
        <p
          data-testid="recipe-category"
        >
          {recipe.strArea}
        </p>
        <Col>
          <Row>
            <div>
              { ingredientsList.map((item, index) => (
                <Row key={ index }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    htmlFor="maracutaia"
                  >
                    <input type="checkbox" />
                    {`${item}${ingrentsMeasuresList[index]
                      ? ingrentsMeasuresList[index] : ''}` }
                  </label>
                </Row>
              ))}
            </div>
            <span data-testid="instructions">
              {recipe.strInstructions}
            </span>
            <button
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar
            </button>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default InProgressMeals;
