import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';
import { getSpecificDrinkById } from '../../store/ducks/getDetailedDrink/actions';

class TelaDeReceitaEmProcesso extends Component {
  constructor(props) {
    super(props);

    this.handleRecipeDone = this.handleRecipeDone.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedMealDispatch, getDetailedDrinkDispatch } = this.props;
    await getDetailedMealDispatch(id);
    await getDetailedDrinkDispatch(id);
  }

  handleIngredients(recipe) {
    const recipeArray = Object.entries(recipe[0]);
    const ingredientsArray = recipeArray.filter(
      (element) => element[0].startsWith('strIngredient') && element[1],
    );
    return ingredientsArray;
  }

  handleRecipeDone(item) {
    const HoraInicial = new Date();
    const horaFinal = HoraInicial.toLocaleDateString();
    console.log(this.props);
    localStorage.setItem('data', horaFinal);
    const { history } = this.props;
    history.push(`/endereçoMagico/${item.idDrink}`);
  }

  handleMeasure(recipe) {
    const recipeArray = Object.entries(recipe[0]);
    const measuresArray = recipeArray.filter(
      (element) => element[0].startsWith('strMeasure') && element[1],
    );
    return measuresArray;
  }

  renderDetailsMeal(meal) {
    const ingredientsArray = this.handleIngredients(meal);
    const measuresArray = this.handleMeasure(meal);

    return (
      <>
        <Container>
          <img data-testid="recipe-photo" alt="comida" src={ meal[0].strMealThumb } />
          <h3 data-testid="recipe-title">{meal[0].strMeal}</h3>
          <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
          <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
          <h4 data-testid="recipe-category">{meal[0].strCategory}</h4>
        </Container>
        <Container>
          <Form>
            <h4>Ingredients</h4>
            {ingredientsArray.map((item, index) => (
              <Form.Check
                type="checkbox"
                label={ `${item[1]} - ${measuresArray[index][1]}` }
                data-testid="ingredient-step"
                key={ item }
              />
            ))}
            <h4>Instructions</h4>
            <p data-testid="instructions">{meal[0].strInstructions}</p>

            <Button
              variant="secondary"
              block
              size="lg"
              data-testid="finish-recipe-btn"
              onClick={ this.handleRecipeDone }
            >
              Finalizar Receita
            </Button>
          </Form>
        </Container>
      </>
    );
  }

  renderDetailsDrink(drink) {
    // const ingredientsArray = this.handleIngredients(drink);
    // const measuresArray = this.handleMeasure(drink);

    return (
      <>
        <Container>
          <img data-testid="recipe-photo" alt="comida" src={ drink[0].strDrinkThumb } />
          <h3 data-testid="recipe-title">{drink[0].strDrink}</h3>
          <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
          <img data-testid="favorite-btn" alt="favorite-btn" src={ whiteHeartIcon } />
          <h4 data-testid="recipe-category">{drink[0].strAlcoholic}</h4>
        </Container>
        <Container>
          <Form>
            <h4>Ingredients</h4>
            {/* {ingredientsArray.map((item, index) => (
              <Form.Check
                type="checkbox"
                label={ `${item[1]} - ${measuresArray[index][1]}` }
                data-testid="ingredient-step"
                key={ item }
              />
            ))} */}
            <h4>Instructions</h4>
            <p data-testid="instructions">{drink[0].strInstructions}</p>

            <Button
              variant="secondary"
              block
              size="lg"
              data-testid="finish-recipe-btn"
              onClick={ this.handleRecipeDone }
            >
              Finalizar Receita
            </Button>
          </Form>
        </Container>
      </>
    );
  }

  render() {
    const { meal, drinkDetailStore } = this.props;
    if (meal) {
      return this.renderDetailsMeal(meal);
    }
    if (drinkDetailStore) {
      return this.renderDetailsDrink(drinkDetailStore);
    }
    return <div>nundeu</div>;
  }
}

TelaDeReceitaEmProcesso.propTypes = {
  drinkDetailStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
  meal: PropTypes.arrayOf(PropTypes.Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
  getDetailedDrinkDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
  drinkDetailStore: state.detalhesDaReceitaBebida.drink.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
  getDetailedDrinkDispatch: (id) => dispatch(getSpecificDrinkById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDeReceitaEmProcesso);
