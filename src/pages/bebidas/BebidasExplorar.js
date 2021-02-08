import React from 'react';
import PropTypes from 'prop-types';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';

class BebidasExplorar extends React.Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    const { history } = this.props;
    const responseAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const recipe = await responseAPI.json();
    const { idDrink } = recipe.drinks[0];
    history.push(`/bebidas/${idDrink}`);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header2 title="Explorar Bebidas" />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          className="btn btn-info"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ this.fetchData }
          className="btn btn-info"
        >
          Me Surpreenda!
        </button>
        <Footer />
      </div>);
  }
}

BebidasExplorar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BebidasExplorar;
