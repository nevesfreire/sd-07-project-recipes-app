import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { randomFoodsApi } from '../services';

export default class CustomExploreFoods extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
  }

  async componentDidMount() {
    const { meals } = await randomFoodsApi();
    console.log(meals);
    this.fetchFoodsRandom(meals[0].idMeal);
  }

  fetchFoodsRandom(value) {
    this.setState({ id: value });
  }

  render() {
    const { id } = this.state;

    return (
      <div>
        <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient">
          <button type="button">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area" data-testid="explore-by-area">
          <button type="button">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${id}` } data-testid="explore-surprise">
          <button type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  }
}
