import React, { Component } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Header } from '../../components';
import mealRecipe from '../../mocks/data';
import shareIcon from '../../images/shareIcon.svg';

class ReceitasFeitas extends Component {
  copyToClipboard(id) {
    const link = `http://localhost:3000/comidas/${id}`;
    link.execCommand('copy');
    this.setState({ copySuccess: 'Link copiado!' });
  }

  render() {
    const title = 'Receitas Feitas';
    const HoraInicial = new Date();
    const horaFinal = HoraInicial.toLocaleDateString();
    const mealMock = mealRecipe.meals[0];
    console.log(this.props);
    return (
      <div>
        <Header title={ title } />
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
        <div>
          <Card style={ { width: '18rem' } }>
            <Card.Img
              variant="top"
              src={ mealMock.strMealThumb }
              data-testid="index-horizontal-image"
            />
            <Card.Body>
              <Card.Title data-testid="index-horizontal-name">
                {mealMock.strMeal}
              </Card.Title>
              <Card.Text data-testid="index-horizontal-top-text">
                {mealMock.strCategory}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem data-testid="index-horizontal-done-date">
                {horaFinal}
              </ListGroupItem>
            </ListGroup>
            <Button variant="primary" size="sm">
              <Card.Img
                variant="top"
                src={ shareIcon }
                data-testid="index-horizontal-share-btn"
                onClick={ () => this.copyToClipboard(mealMock.idMeal) }
              />
            </Button>
            <Card.Body>
              <br />
              <Button variant="primary" size="sm" disabled>
                Tag 02
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default ReceitasFeitas;
