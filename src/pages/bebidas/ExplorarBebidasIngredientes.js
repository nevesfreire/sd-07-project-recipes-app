import React from 'react';
import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';

class ExplorarBebidasIngredientes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const ZERO = 0;
    const TWELVE = 12;
    const responseAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const recipes = await responseAPI.json();
    const twelveRecipes = recipes.drinks.slice(ZERO, TWELVE);
    this.setState({
      recipes: twelveRecipes,
    });
  }

  renderCards() {
    const { recipes } = this.state;
    return (
      recipes.map((r, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${r.strIngredient1}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt="recipe img"
            width="100px"
          />
          <h4 data-testid={ `${index}-card-name` }>{r.strIngredient1}</h4>
        </button>
      ))
    );
  }

  render() {
    return (
      <div>
        <Header2 title="Explorar Ingredientes" />
        <div>{this.renderCards()}</div>
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebidasIngredientes;
