import React, { Component } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getStorage from '../../services/localStorageAPI/getStorage';
import setStorage from '../../services/localStorageAPI/setStorage';
import { Header } from '../../components';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

class ReceitasFavoritas extends Component {
  constructor() {
    super();
    this.state = { copySuccess: '', renderRecipes: [] };
    this.defaultRender = this.defaultRender.bind(this);
    this.filterByDrinks = this.filterByDrinks.bind(this);
    this.filterByMeals = this.filterByMeals.bind(this);
    this.filterByAll = this.filterByAll.bind(this);
  }

  componentDidMount() {
    this.defaultRender();
  }

  async handleFavoriteClick(recipe) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const newLocalStorage = favoritesFromStorage.filter(
      (curr) => curr.id !== recipe.id,
    );
    await setStorage('favoriteRecipes', newLocalStorage);
    this.setState({ renderRecipes: newLocalStorage });
  }

  copyToClipboard(id) {
    const link = `http://localhost:3000/comidas/${id}`;
    navigator.clipboard.writeText(link);
    this.setState({ copySuccess: 'Link copiado!' });
  }

  redirectMeal(id) {
    const { history } = this.props;
    return history.push(`/comidas/${id}`);
  }

  redirectDrink(id, type) {
    const { history } = this.props;
    if (type === 'bebida') {
      return history.push(`/bebidas/${id}`);
    }
  }

  filterByDrinks() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const drinksRecipes = recipes.filter((recipe) => recipe.type === 'bebida');
    this.setState({ renderRecipes: drinksRecipes });
  }

  filterByMeals() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const mealsRecipes = recipes.filter((recipe) => recipe.type === 'comida');
    this.setState({ renderRecipes: mealsRecipes });
  }

  filterByAll() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ renderRecipes: recipes });
  }

  defaultRender() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ renderRecipes: recipes });
  }

  renderBlackHeart(index) {
    return (
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        alt="favorite-btn"
        src={ blackHeartIcon }
      />
    );
  }

  renderArrayMeals(recipes) {
    const { copySuccess } = this.state;
    return recipes.map((recipe, index) => (
      <div key={ recipe }>
        <Card style={ { width: '18rem' } }>
          <Button variant="outline-primary">
            <Card.Img
              variant="top"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => this.redirectMeal(recipe.id) }
            />
          </Button>
          <Card.Body>
            <Card.Title
              onClick={ () => this.redirectDrink(recipe.id, recipe.type) }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </Card.Title>
            <Card.Text data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}`}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </ListGroupItem>
          </ListGroup>
          <Button variant="primary" size="sm">
            <Card.Img
              variant="top"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => this.copyToClipboard(recipe.id) }
            />
            {copySuccess}
          </Button>
          <div
            onClick={ () => this.handleFavoriteClick(recipe) }
            onKeyDown={ () => this.handleFavoriteClick(recipe) }
            role="button"
            tabIndex={ 0 }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="favorite-btn"
              src={ blackHeartIcon }
            />
          </div>
        </Card>
      </div>
    ));
  }

  render() {
    const { renderRecipes } = this.state;
    const title = 'Receitas Feitas';
    return (
      <div>
        <Header title={ title } />
        <div>
          <Button
            variant="outline-primary"
            data-testid="filter-by-all-btn"
            onClick={ () => this.filterByAll() }
          >
            All
          </Button>
          <Button
            variant="outline-primary"
            data-testid="filter-by-food-btn"
            onClick={ () => this.filterByMeals() }
          >
            Food
          </Button>
          <Button
            variant="outline-primary"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filterByDrinks() }
          >
            Drinks
          </Button>
        </div>
        {renderRecipes === null ? (
          <h1>Sem receitas feitas</h1>
        ) : (
          this.renderArrayMeals(renderRecipes)
        )}
        <Link to="/comidas">Teste</Link>
      </div>
    );
  }
}

ReceitasFavoritas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReceitasFavoritas;
