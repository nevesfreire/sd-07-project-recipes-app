import React from 'react';
import PropTypes from 'prop-types';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';

class ExplorarComidasIngredientes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.clickRecipe = this.clickRecipe.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const ZERO = 0;
    const TWELVE = 12;
    const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const recipes = await responseAPI.json();
    const twelveRecipes = recipes.meals.slice(ZERO, TWELVE);
    this.setState({
      recipes: twelveRecipes,
    });
  }

  clickRecipe(id) {
    const { history } = this.props;
    history.push(`/comidas/${id}`);
  }

  renderCards() {
    const { recipes } = this.state;
    return (
      recipes.map((r, index) => (
        <button
          key={ r.idIngredient }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => this.clickRecipe(r.idIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${r.strIngredient}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt="recipe img"
            width="100px"
          />
          <h4 data-testid={ `${index}-card-name` }>{r.strIngredient}</h4>
        </button>
      ))
    );
  }

  render() {
    return (
      <div>
        <Header2 title="Explorar Ingredientes" />
        <div>
          {this.renderCards()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default ExplorarComidasIngredientes;

ExplorarComidasIngredientes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
