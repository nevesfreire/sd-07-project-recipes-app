import React from 'react';
import { Redirect } from 'react-router-dom';
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
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => this.setState({ redirect: '/explorar/bebidas/ingredientes' }) }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => this.randomRecipes() }
        >
          Me Surpreenda!
        </button>
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebida;
