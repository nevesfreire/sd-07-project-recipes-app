import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button, Form } from 'react-bootstrap';
import clipboard from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';
import { getSpecificDrinkById } from '../../store/ducks/getDetailedDrink/actions';
import getStorage from '../../services/localStorageAPI/getStorage';
import setStorage from '../../services/localStorageAPI/setStorage';
import * as functions from './functions';

class TelaDeReceitaEmProcessoDrinks extends Component {
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
      isClicked: false,
      isFavorite: false,
      isEnabled: true,
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { getDetailedMealDispatch, getDetailedDrinkDispatch } = this.props;
    await getDetailedMealDispatch(id);
    await getDetailedDrinkDispatch(id);
    this.checkStorage();
  }

  componentDidUpdate() {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    const { drinkDetailStore } = this.props;
    if (drinkDetailStore) {
      if (!favoritesFromStorage) {
        setStorage('favoriteRecipes', []);
      } else if (!isFavorite) { this.handleFavoriteStart(drinkDetailStore); }
    }
  }

  handleFavoriteStart(drinkDetailStore) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const zero = 0;
    if (favoritesFromStorage.length !== zero) {
      favoritesFromStorage.forEach((item) => {
        if (item.id === drinkDetailStore[0].idDrink) {
          this.setState({ isFavorite: true });
        }
      });
    }
  }

  handleFavoriteClick(drink) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    if (isFavorite) {
      const newLocalStorage = favoritesFromStorage.filter(
        (curr) => curr.id !== drink.idDrink,
      );
      setStorage('favoriteRecipes', newLocalStorage);
      this.setState({ isFavorite: false });
    } else {
      const newLocalStorageObj = {
        id: drink.idDrink,
        type: 'bebida',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      favoritesFromStorage.push(newLocalStorageObj);
      setStorage('favoriteRecipes', favoritesFromStorage);
      this.setState({ isFavorite: true });
    }
  }

  handleShareClick() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isClicked: true });
    clipboard(`http://localhost:3000/bebidas/${id}`);
  }

  handleCheck(event, index, drink) {
    const { target: { checked } } = event;
    const { checkboxes } = this.state;
    if (checked) {
      checkboxes[index] = true;
      const checks = JSON.stringify(checkboxes);
      return this.setState({ checkboxes },
        () => localStorage.setItem('checkboxesD', checks), this.enableButton(drink));
    }
    checkboxes[index] = false;
    const checks = JSON.stringify(checkboxes);
    return this.setState({ checkboxes },
      () => localStorage.setItem('checkboxesD', checks), this.enableButton(drink));
  }

  enableButton(drink) {
    const { checkboxes } = this.state;
    const ingredientsArray = functions.handleIngredients(drink);
    const arrayCheckboxes = Object.values(checkboxes);
    const trueCheck = arrayCheckboxes.filter((element) => element);
    if (trueCheck.length === ingredientsArray.length) {
      return this.setState({ isEnabled: false });
    } return this.setState({ isEnabled: true });
  }

  checkStorage() {
    const storageChecks = localStorage.getItem('checkboxesD');
    const checks = JSON.parse(storageChecks);
    console.log(checks);
    if (storageChecks) return this.setState({ checkboxes: checks });
  }

  renderDetailsDrink(drink, history) {
    const ingredientsArray = functions.handleIngredients(drink);
    const measuresArray = functions.handleMeasure(drink);
    const { checkboxes, isClicked, isFavorite, isEnabled } = this.state;
    return (
      <>
        <Container>
          <img
            data-testid="recipe-photo"
            alt="comida"
            src={ drink[0].strDrinkThumb }
          />
          <h3 data-testid="recipe-title">{drink[0].strDrink}</h3>
          <div
            onClick={ this.handleShareClick }
            onKeyDown={ this.handleShareClick }
            role="button"
            tabIndex={ 0 }
          >
            <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
          </div>
          <tag>{isClicked ? 'Link copiado!' : null}</tag>
          <div
            onClick={ () => this.handleFavoriteClick(drink[0]) }
            onKeyDown={ () => this.handleFavoriteClick(drink[0]) }
            role="button"
            tabIndex={ 0 }
          >
            {!isFavorite ? functions.renderWhiteHeart() : functions.renderBlackHeart()}
          </div>
          <h4 data-testid="recipe-category">{drink[0].strAlcoholic}</h4>
        </Container>
        <Container>
          <Form>
            <h4>Ingredients</h4>
            {ingredientsArray.map((item, index) => (
              <div key={ item } data-testid={ `${index}-ingredient-step` }>
                <Form.Check
                  type="checkbox"
                  onClick={ (e) => this.handleCheck(e, index, drink) }
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
            <p data-testid="instructions">{drink[0].strInstructions}</p>

            <Button
              data-testid="finish-recipe-btn"
              onClick={ () => functions.handleRecipeDone(history) }
              disabled={ isEnabled }
            >
              Finalizar Receita
            </Button>
          </Form>
        </Container>
      </>
    );
  }

  render() {
    const { drinkDetailStore, history } = this.props;
    if (drinkDetailStore) {
      return this.renderDetailsDrink(drinkDetailStore, history);
    }
    return <div>Loading...</div>;
  }
}

TelaDeReceitaEmProcessoDrinks.propTypes = {
  drinkDetailStore: PropTypes.arrayOf(PropTypes.Object).isRequired,
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
)(TelaDeReceitaEmProcessoDrinks);
