import React from 'react';
import { Redirect } from 'react-router-dom';
import { Col, Button, Row } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import apiTheMealDB from '../services/apiTheMealDB';

class ExplorarComida extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
  }

  async randomRecipes() {
    const randomRecipe = await apiTheMealDB('random.php');
    console.log(randomRecipe);
    this.setState({ redirect: `/comidas/${randomRecipe.meals[0].idMeal}` });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to={ redirect } />}
        <Header pageTitle="Explorar Comidas" />
        <div style={ { height: '90vh' } }>
          <Col style={ { marginTop: '30%' } }>
            <Button
              style={ { color: 'black' } }
              variant="outline-warning"
              type="button"
              data-testid="explore-by-ingredient"
              onClick={ () => this.setState({ redirect: '/explorar/comidas/ingredientes' }) }
            >
              Por Ingredientes
            </Button>
            <Row style={ { marginTop: '5px', marginLeft: '173px' } }>
              <Button
                style={ { color: 'black' } }
                variant="outline-warning"
                type="button"
                data-testid="explore-by-area"
                onClick={ () => this.setState({ redirect: '/explorar/comidas/area' }) }
              >
                Por Local de Origem
              </Button>
            </Row>
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

export default ExplorarComida;
