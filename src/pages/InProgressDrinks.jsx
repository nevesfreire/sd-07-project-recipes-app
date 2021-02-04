import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import apiTheCocktailDB from '../services/apiTheCocktailDB';

class InProgressDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: '',
      ingredientsList: [],
      ingrentsMeasuresList: [],
      checkBox: {},
    };
    this.maracutaia = this.maracutaia.bind(this);
  }

  async componentDidMount() {
    await this.callRecipeAPI();
    this.maracutaia();
  }

  async handleInputChange({ target }) {
    const { value, name } = target;
    const { checkBox } = this.state;

    const response = target.type === 'checkbox' ? target.checked : value;
    await this.setState({
      checkBox: {
        ...checkBox, [name]: response,
      },
    });
    localStorage.setItem('checkedItensDrinks', JSON.stringify(this.state.checkBox));
  }

  async callRecipeAPI() {
    const magicThree = 3;
    const localData = localStorage.getItem('inProgressDrinkRecipe');
    const checkedItens = localStorage.getItem('checkedItensDrinks');
    if (localData === null) {
      const urlParams = window.location.pathname.split('/', magicThree).pop();
      const recipe = await apiTheCocktailDB(`lookup.php?i=${urlParams}`);
      this.setState({
        recipe: recipe.drinks[0],
      });
      return localStorage
        .setItem('inProgressDrinkRecipe', JSON.stringify(recipe.drinks[0]));
    }
    this.setState({ recipe: JSON.parse(localData), checkBox: JSON.parse(checkedItens) });
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
    const { recipe } = this.state;
    if (recipe === '') {
      return <p>Loading...</p>;
    }
    const { ingredientsList, ingrentsMeasuresList, checkBox } = this.state;
    return (
      <Container fluid>
        <Col>
          <img
            src={ recipe.strDrinkThumb }
            style={ { width: '20%' } }
            data-testid="recipe-photo"
            alt="soDrinkt"
          />
        </Col>
        <h3
          data-testid="recipe-title"
        >
          {recipe.strDrink}
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
                    <input
                      name={ item }
                      type="checkbox"
                      value={ item }
                      checked={ checkBox ? checkBox[item] : false }
                      onClick={ (e) => this.handleInputChange(e) }
                    />
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

export default InProgressDrinks;
