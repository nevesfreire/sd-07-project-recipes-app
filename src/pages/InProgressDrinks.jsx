import React from 'react'; import PropTypes from 'prop-types';
import { Button, Row, Card, Container } from 'react-bootstrap';
import apiTheCocktailDB from '../services/apiTheCocktailDB';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Loading from '../components/Loading';

class InProgressDrinks extends React.Component {
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
    localStorage.setItem('checkedItensDrinks', JSON.stringify(checkBox));
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
      return <Loading />;
    }
    const { ingredientsList, ingrentsMeasuresList, checkBox, buttonStatus } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Card
          style={ { width: '20rem',
            marginTop: '30px',
            background: 'rgb(254, 175, 91)',
            marginLeft: '100px',
            marginBottom: '20px',
            borderRadius: '15px' } }
        >
          <Card.Body>
            <Card.Img
              src={ recipe.strDrinkThumb }
              data-testid="recipe-photo"
              alt="soDrinkt"
            />
            <Card.Title>
              <h3
                data-testid="recipe-title"
              >
                {recipe.strDrink}
              </h3>
            </Card.Title>
            <p
              data-testid="recipe-category"
            >
              {recipe.strArea}
            </p>
            <Card.Text style={ { marginLeft: '20px' } }>
              { ingredientsList.map((item, index) => (
                <Row key={ index }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    htmlFor="maracutaia"
                  >
                    <input
                      style={ { marginRight: '4px' } }
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
            </Card.Text>
          </Card.Body>
        </Card>
        <Container style={ { marginBottom: '40px' } }>
          <p>Instruções</p>
          <span data-testid="instructions">
            {recipe.strInstructions}
          </span>
        </Container>
        <div style={ { position: 'fixed', right: '0', top: '150px' } }>
          <ShareButton url={ window.location.pathname } />
          <FavoriteButton storageObj={ recipe } />
        </div>
        <Button
          variant="warning"
          style={ { position: 'fixed', bottom: 0, left: 0 } }
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ buttonStatus }
          onClick={ () => history.push('/receitas-feitas') }
        >
          Finalizar
        </Button>
      </div>
    );
  }
}

export default InProgressDrinks;

InProgressDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
