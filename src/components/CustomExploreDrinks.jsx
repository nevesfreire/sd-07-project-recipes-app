import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { randomDrinksApi } from '../services';

export default class CustomExploreDrinks extends Component {
  constructor(props) {
    super(props);
    this.state = { randomId: 0 };
  }

  async componentDidMount() {
    const { drinks } = await randomDrinksApi();
    this.fetchDrinksRandom(drinks[0].idDrink);
  }

  fetchDrinksRandom(value) {
    this.setState({ randomId: value });
  }

  render() {
    const { randomId } = this.state;
    return (
      <div>
        <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient">
          <button type="button">
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${randomId}` } data-testid="explore-surprise">
          <button type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  }
}
