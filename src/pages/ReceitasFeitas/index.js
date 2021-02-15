import React, { Component } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import shareIcon from '../../images/shareIcon.svg';

class ReceitasFeitas extends Component {
  constructor() {
    super();
    this.state = { copySuccess: '' };
  }

  copyToClipboard(id) {
    const link = `http://localhost:3000/comidas/${id}`;
    navigator.clipboard.writeText(link);
    this.setState({ copySuccess: 'Link copiado!' });
  }

  redirectDetail(id) {
    const { history } = this.props;
    history.push(`/comidas/${id}`);
  }

  renderArrayMeals(recipes) {
    const { copySuccess } = this.state;
    const dateString = localStorage.getItem('data');
    return (recipes.map((recipe, index) => (
      <div key={ recipe }>
        <Card style={ { width: '18rem' } }>
          <Button variant="outline-primary">
            <Card.Img
              variant="top"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => this.redirectDetail(recipe.idMeal) }
            />
          </Button>
          <Card.Body>
            <Card.Title data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </Card.Title>
            <Card.Text data-testid={ `${index}-horizontal-top-text` }>
              {recipe.category}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem data-testid={ `${index}-horizontal-done-date` }>
              {dateString}
            </ListGroupItem>
          </ListGroup>
          <Button variant="primary" size="sm">
            <Card.Img
              variant="top"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => this.copyToClipboard(recipe.idMeal) }
            />
            { copySuccess }
          </Button>
          <Card.Body>
            <br />
            {recipe.tags.map((tag) => (
              <Button variant="primary" size="sm" disabled key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </Button>
            ))}
          </Card.Body>
        </Card>
      </div>)));
  }

  render() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(recipes.length);
    const title = 'Receitas Feitas';
    return (
      <div>
        <Header title={ title } />
        {/* Falta funções dos botões de Filtro */}
        <div>
          <Button variant="outline-primary" data-testid="filter-by-all-btn">
            All
          </Button>
          <Button variant="outline-primary" data-testid="filter-by-food-btn">
            Food
          </Button>
          <Button variant="outline-primary" data-testid="filter-by-drink-btn">
            Drinks
          </Button>
        </div>
        {this.renderArrayMeals(recipes)}
        <Link to="/comidas">Teste</Link>
      </div>
    );
  }
}

export default ReceitasFeitas;
