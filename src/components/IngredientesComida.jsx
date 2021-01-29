import React from 'react';
import Header from './Header';
import Footer from './Footer';
import apiTheMealDB from '../services/apiTheMealDB';

class IngredientesComida extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  }

  async getIngredients() {
    const result = await apiTheMealDB('list.php?i=list');
    console.log(result);
    this.setState({ data: result.meals });
  }

  render() {
    const { data } = this.state;
    const nrItems = 12;
    return (
      <div>
        <Header pageTitle="Explorar Ingredientes" />
        {data ? data.map((item, index) => (
          index < nrItems ? (
            <div data-testid={ `${index}-ingredient-card` } key={ index }>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                alt={ item.strIngredient }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{item.strIngredient}</p>
            </div>) : null
        )) : <p>Loading...</p>}
        <Footer />
      </div>
    );
  }
}

export default IngredientesComida;
