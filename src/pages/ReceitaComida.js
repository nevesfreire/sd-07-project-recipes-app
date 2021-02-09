import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel, Container, Card, Button } from 'react-bootstrap';
import { apiTheCocktailDB, apiTheMealDB } from '../services';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { startRecipe } from '../redux/actions';
import Loading from '../components/Loading';

class ReceitaComida extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
      drinkList: [],
      storageObj: {},
    };

    this.callRecipeAPI = this.callRecipeAPI.bind(this);
    this.ingredientListHandle = this.ingredientListHandle.bind(this);
  }

  componentDidMount() {
    this.callRecipeAPI();
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }

  async callRecipeAPI() {
    // referência proxima linha: https://stackoverflow.com/questions/4758103/
    const urlParams = window.location.pathname.split('/').pop();
    const recipe = await apiTheMealDB(`lookup.php?i=${urlParams}`);
    // const arrayTags = recipe.meals[0].strTags === null
    //   ? [] : recipe.meals[0].strTags.split(',');
    const storageObj = {
      id: recipe.meals[0].idMeal,
      type: 'comida',
      area: recipe.meals[0].strArea,
      category: recipe.meals[0].strCategory,
      alcoholicOrNot: '',
      name: recipe.meals[0].strMeal,
      image: recipe.meals[0].strMealThumb,
      // doneDate: recipe.meals[0].dateModified,
      // tags: arrayTags,
    };
    const drinkList = await apiTheCocktailDB('search.php?s=');
    this.setState({
      recipe: recipe.meals[0],
      drinkList: drinkList.drinks,
      storageObj,
    });
  }

  ingredientListHandle() {
    const { recipe } = this.state;
    const array = [];
    const twentyOne = 21;
    for (let index = 1; index < twentyOne; index += 1) {
      const strIngredient = `strIngredient${[index]}`;
      const strMeasure = `strMeasure${[index]}`;
      if (recipe[strIngredient] !== null && recipe[strIngredient] !== '') {
        array.push(`${recipe[strIngredient]} - ${recipe[strMeasure]}`);
      }
    }
    return array;
  }

  async startRecipeButton() {
    const { recipe } = this.state;
    const { startRecipeDispatch, history } = this.props;
    localStorage.setItem('inProgressRecipe', JSON.stringify(recipe));
    await startRecipeDispatch(recipe);
    history.push(`/comidas/${recipe.idMeal}/in-progress`);
  }

  render() {
    const { recipe, drinkList, storageObj } = this.state;
    const SIX = 6;
    const ingredientsArray = this.ingredientListHandle();
    const url = window.location.pathname;
    if (recipe === '') {
      return <Loading />;
    }

    return (
      <div>
        <h1
          style={
            { background: 'rgb(245, 176, 36)',
              marginBottom: '10px' }
          }
        >
          Receita de Comida
        </h1>
        <Card
          style={ { width: '20rem',
            background: 'rgb(254, 175, 91)',
            marginLeft: '100px',
            marginBottom: '20px',
            borderRadius: '15px' } }
        >
          <Card.Body>
            <Card.Img
              src={ recipe.strMealThumb }
              alt={ recipe.strMealThumb }
              data-testid="recipe-photo"
            />
            <Card.Title>
              <h4 data-testid="recipe-title">{ recipe.strMeal }</h4>
            </Card.Title>
            <Card.Subtitle>
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
            </Card.Subtitle>
            <p>Ingredientes</p>
            <Card.Text>
              <ul>
                { ingredientsArray.map((e, index) => (
                  <li
                    key={ e }
                    data-testid={ `${[index]}-ingredient-name-and-measure` }
                    style={ { listStyle: 'none', paddingRight: '35px' } }
                  >
                    {e}
                  </li>
                )) }
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
        <Container>
          <p>Instruções</p>
          <p data-testid="instructions">{ recipe.strInstructions}</p>
        </Container>
        <div style={ { position: 'fixed', right: '0', top: '150px' } }>
          <ShareButton url={ url } />
          <FavoriteButton storageObj={ storageObj } />
        </div>
        <iframe
          title="youtube"
          width="360"
          height="360"
          frameBorder="0"
          allowFullScreen
          // referência proxima linha: https://stackoverflow.com/questions/20498831/
          src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
        <p>Recomendadas</p>
        <Carousel style={ { height: '30%', marginBottom: '30px' } }>
          { drinkList.map((item, index) => (
            index < SIX
              ? (
                <Carousel.Item
                  key={ item.idDrink }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ item.strDrinkThumb }
                    alt={ item.strDrinkThumb }
                    style={ { width: '30%' } }
                  />
                  <Carousel.Caption>
                    <p>{item.strAlcoholic}</p>
                    <h5
                      data-testid={ `${index}-recomendation-title` }
                    >
                      {item.strDrink}
                    </h5>
                  </Carousel.Caption>
                </Carousel.Item>
              )
              : null
          ))}
        </Carousel>
        <Button
          variant="warning"
          style={ { position: 'fixed', bottom: 0, left: 0 } }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => this.startRecipeButton() }
        >
          Iniciar receita
        </Button>
      </div>
    );
  }
}

ReceitaComida.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  startRecipeDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  startRecipeDispatch: (e) => dispatch(startRecipe(e)),
});

export default connect(null, mapDispatchToProps)(ReceitaComida);
