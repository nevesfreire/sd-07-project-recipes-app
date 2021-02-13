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
    this.state = {
      checkboxes: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
      },
    };
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
    this.checkStorage();
  }

  handleCheck(event, index) {
    const {
      target: { checked },
    } = event;
    const { checkboxes } = this.state;
    if (checked) {
      checkboxes[index] = true;
      const checks = JSON.stringify(checkboxes);
      return this.setState({ checkboxes },
        () => localStorage.setItem('checkboxesM', checks));
    }
    checkboxes[index] = false;
    const checks = JSON.stringify(checkboxes);
    return this.setState({ checkboxes },
      () => localStorage.setItem('checkboxesM', checks));
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

  checkStorage() {
    const storageChecks = localStorage.getItem('checkboxesM');
    const checks = JSON.parse(storageChecks);
    console.log(checks);
    if (storageChecks) {
      return this.setState({ checkboxes: checks });
    }
  }

  renderDetailsMeal(meal) {
    const ingredientsArray = this.handleIngredients(meal);
    const measuresArray = this.handleMeasure(meal);
    const { checkboxes } = this.state;
    return (
      <>
        <Container>
          <img
            data-testid="recipe-photo"
            alt="comida"
            src={ meal[0].strMealThumb }
          />
          <h3 data-testid="recipe-title">{meal[0].strMeal}</h3>
          <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
          <img
            data-testid="favorite-btn"
            alt="favorite-btn"
            src={ whiteHeartIcon }
          />
          <h4 data-testid="recipe-category">{meal[0].strCategory}</h4>
        </Container>
        <Container>
          <Form>
            <h4>Ingredients</h4>
            {ingredientsArray.map((item, index) => (
              <div key={ item } data-testid={ `${index}-ingredient-step` }>
                <Form.Check
                  type="checkbox"
                  onClick={ (e) => this.handleCheck(e, index) }
                  defaultChecked={ checkboxes[index] }
                />
                <Form.Check.Label>
                  {`${item[1]} - ${
                    measuresArray[index]
                      ? measuresArray[index][1]
                      : 'Like taste'
                  }`}
                </Form.Check.Label>
              </div>
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

  render() {
    const { meal } = this.props;
    if (meal) {
      return this.renderDetailsMeal(meal);
    }
    return <div>Loading...</div>;
  }
}

TelaDeReceitaEmProcesso.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelaDeReceitaEmProcesso);
