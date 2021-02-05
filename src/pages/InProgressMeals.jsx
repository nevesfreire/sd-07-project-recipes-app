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
      checkBox: null,
      buttonStatus: true,
    };
    this.maracutaia = this.maracutaia.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  async componentDidMount() {
    await this.callRecipeAPI();
    this.maracutaia();
    this.toggleButton();
  }

  async handleInputChange({ target }) {
    const { value, name } = target;
    const response = target.type === 'checkbox' ? target.checked : value;
    await this.setState((prevState) => ({
      checkBox: {
        ...prevState.checkBox, [name]: response,
      },
    }));
    const { checkBox } = this.state;
    localStorage.setItem('checkedItens', JSON.stringify(checkBox));
    this.toggleButton();
  }

  toggleButton() {
    const { ingredientsList, checkBox } = this.state;
    if (!checkBox) {
      const obj = {};
      ingredientsList.forEach((item) => { obj[item] = false; });
      return this.setState({ checkBox: obj });
    }
    this.setState({ buttonStatus: !Object
      .values(checkBox).every((item) => item === true) });
  }

  async callRecipeAPI() {
    const magicThree = 3;
    const localData = localStorage.getItem('inProgressMealRecipe');
    const checkedItens = localStorage.getItem('checkedItens');
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
    const { ingredientsList,
      ingrentsMeasuresList, recipe, checkBox, buttonStatus } = this.state;
    const { history } = this.props;

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
              disabled={ buttonStatus }
              onClick={ () => history.push('/receitas-feitas') }
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
