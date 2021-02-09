import React from 'react';
import { Redirect } from 'react-router-dom';
import { Col, Button, Row } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import apiTheCocktailDB from '../services/apiTheCocktailDB';

class ExplorarBebida extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
  }

  async randomRecipes() {
    const randomRecipe = await apiTheCocktailDB('random.php');
    this.setState({ redirect: `/bebidas/${randomRecipe.drinks[0].idDrink}` });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to={ redirect } />}
        <Header pageTitle="Explorar Bebidas" />
        <div style={ { height: '90vh' } }>
          <Col style={ { marginTop: '30%' } }>
            <Button
              style={ { color: 'black' } }
              variant="outline-warning"
              type="button"
              data-testid="explore-by-ingredient"
              onClick={ () => this.setState({ redirect: '/explorar/bebidas/ingredientes' }) }
            >
              Por Ingredientes
            </Button>
            <Row style={ { marginTop: '5px', marginLeft: '173px' } }>
              <Button
                style={ { color: 'black' } }
                variant="outline-warning"
                type="button"
                data-testid="explore-surprise"
                onClick={ () => this.randomRecipes() }
              >
                Me Surpreenda!
              </Button>
            </Row>
          </Col>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebida;
