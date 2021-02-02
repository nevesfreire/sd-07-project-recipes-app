import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import { apiTheMealDB, apiTheCocktailDB } from '../services';
import { Header, Footer, RecipesCards, Loading } from '../components';

class Ingredientes extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
    this.getIngredients = this.getIngredients.bind(this);
  }

  async componentDidMount() {
    await this.getIngredients();
  }

  async getIngredients() {
    const { location: { pathname } } = this.props;
    if (pathname === '/explorar/bebidas/ingredientes') {
      const result = await apiTheCocktailDB('list.php?i=list');
      this.setState({ data: result.drinks });
    }
    if (pathname === '/explorar/comidas/ingredientes') {
      const result = await apiTheMealDB('list.php?i=list');
      this.setState({ data: result.meals });
    }
  }

  render() {
    const { location: { pathname } } = this.props;
    const { data } = this.state;
    return (
      <div>
        <Container fluid>
          <Header pageTitle="Explorar Ingredientes" />
          {pathname === '/explorar/comidas/ingredientes' && (
            <Row>
              {data ? data.map((item, index) => (
                <RecipesCards
                  key={ index }
                  recipe={ item }
                  search="ingredientsMeals"
                  index={ index }
                />
              )) : <Loading />}
            </Row>
          )}
          {pathname === '/explorar/bebidas/ingredientes' && (
            <Row>
              {data ? data.map((item, index) => (
                <RecipesCards
                  key={ index }
                  recipe={ item }
                  search="ingredientsDrinks"
                  index={ index }
                />
              )) : <Loading />}
            </Row>
          )}
          <Footer />
        </Container>
      </div>
    );
  }
}
Ingredientes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.func.isRequired }).isRequired,
};

export default Ingredientes;
