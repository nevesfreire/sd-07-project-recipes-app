import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Bebida from '../../components/Bebida';
import Comida from '../../components/Comida';

class Favoritas extends Component {
  constructor() {
    super();
    this.filtro = this.filtro.bind(this);
    this.setControle = this.setControle.bind(this);
    this.chamando = this.chamando.bind(this);
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!store) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const store2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.state = {
      food: true,
      drink: true,
      controle: store2,
    };
  }

  setControle(valor) {
    this.setState({ controle: valor });
  }

  filtro(caso) {
    const { food, drink } = this.state;
    switch (caso) {
    case 'All':
      if (!food || !drink) {
        this.setState({ food: true, drink: true });
      }
      break;
    case 'Food':
      if (drink) {
        this.setState({ food: true, drink: false });
      } else {
        this.setState({ food: true, drink: true });
      }
      break;
    case 'Drinks':
      if (food) {
        this.setState({ food: false, drink: true });
      } else {
        this.setState({ food: true, drink: true });
      }
      break;
    default:
      break;
    }
  }

  chamando() {
    const { controle, food, drink } = this.state;
    const zero = 0;
    if (controle.length > zero) {
      if (!drink) {
        const comidas = controle.filter((objetoDelicioso) => (
          objetoDelicioso.type === 'comida'
        ));
        return (comidas.map((comida, index) => {
          const { image, name, category, area, id } = comida;
          const { history } = this.props;
          const obj = {
            image,
            name,
            category,
            area,
            id,
            history,
            set: this.setControle,
            index,
          };
          return (<Comida key={ name } inf={ obj } />);
        }));
      } if (!food) {
        const bebidas = controle.filter((objetoAlcolatra) => (
          objetoAlcolatra.type === 'bebida'
        ));
        return (bebidas.map((bebida, index) => {
          const { image, name, alcoholicOrNot, id } = bebida;
          const { history } = this.props;
          const obj = {
            image,
            name,
            alcoholicOrNot,
            id,
            history,
            set: this.setControle,
            index,
          };
          return (<Bebida key={ name } inf={ obj } />);
        }));
      }
      return (controle.map((item, index) => {
        if (item.type === 'bebida') {
          const { image, name, alcoholicOrNot, id } = item;
          const { history } = this.props;
          const obj = {
            image,
            name,
            alcoholicOrNot,
            id,
            history,
            set: this.setControle,
            index,
          };
          return (<Bebida key={ name } inf={ obj } />);
        } if (item.type === 'comida') {
          const { image, name, category, area, id } = item;
          const { history } = this.props;
          const obj = {
            image,
            name,
            category,
            area,
            id,
            history,
            set: this.setControle,
            index,
          };
          return (<Comida key={ name } inf={ obj } />);
        }
        return null;
      }));
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Receitas Favoritas" searchOn="off" history={ history } />
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => this.filtro('All') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => this.filtro('Food') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filtro('Drinks') }
          >
            Drinks
          </button>
        </div>
        <div>
          {
            this.chamando()
          }
        </div>
      </div>
    );
  }
}

Favoritas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Favoritas;
