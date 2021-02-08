import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendDrinkRecipes, sendMealRecipes } from '../redux/actions';
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

  async saveToRedux(item, type) {
    const { sendMealRecipesDispatch, sendDrinkRecipesDispatch, history } = this.props;
    if (type === 'comidas') {
      const response = await apiTheMealDB(`filter.php?i=${item.strIngredient}`);
      await sendMealRecipesDispatch(response.meals);
      history.push('/comidas');
    }
    if (type === 'bebidas') {
      const response = await apiTheCocktailDB(`filter.php?i=${item.strIngredient1}`);
      await sendDrinkRecipesDispatch(response.drinks);
      history.push('/bebidas');
    }
  }

  render() {
    const { location: { pathname } } = this.props;
    const { data } = this.state;
    return (
      <div>
        <Header pageTitle="Explorar Ingredientes" />
        {pathname === '/explorar/comidas/ingredientes' && (
          <Row className="ml-1 mb-5 mt-2">
            {data ? data.map((item, index) => (
              <div
                to="/comidas"
                key={ index }
                onClick={ () => this.saveToRedux(item, 'comidas') }
                onKeyPress={ () => ('') }
                role="link"
                tabIndex={ index }
              >
                <RecipesCards
                  recipe={ item }
                  search="ingredientsMeals"
                  index={ index }
                />
              </div>
            )) : <Loading />}
          </Row>
        )}
        {pathname === '/explorar/bebidas/ingredientes' && (
          <Row className="ml-1 mb-5 mt-2">
            {data ? data.map((item, index) => (
              <div
                to="/bebidas"
                key={ index }
                onClick={ () => this.saveToRedux(item, 'bebidas') }
                onKeyPress={ () => ('') }
                role="link"
                tabIndex={ index }
              >
                <RecipesCards
                  recipe={ item }
                  search="ingredientsDrinks"
                  index={ index }
                />
              </div>
            )) : <Loading />}
          </Row>
        )}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMealRecipesDispatch: (e) => dispatch(sendMealRecipes(e)),
  sendDrinkRecipesDispatch: (e) => dispatch(sendDrinkRecipes(e)),
});

Ingredientes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  sendMealRecipesDispatch: PropTypes.func.isRequired,
  sendDrinkRecipesDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Ingredientes);
