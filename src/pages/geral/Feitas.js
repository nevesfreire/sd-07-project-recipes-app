import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Bebida2 from '../../components/Bebida2';
import Comida2 from '../../components/Comida2';

class Favoritas extends Component {
  constructor() {
    super();
    this.filtro = this.filtro.bind(this);
    this.chamando = this.chamando.bind(this);
    const store = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!store) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    this.state = {
      food: true,
      drink: true,
    };
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
    const { food, drink } = this.state;
    const store = JSON.parse(localStorage.getItem('doneRecipes'));
    const zero = 0;
    if (store.length > zero) {
      if (!drink) {
        const comidas = store.filter((objetoDelicioso) => (
          objetoDelicioso.type === 'comida'
        ));
        return (comidas.map((comida, index) => {
          const { image, name, category, area, doneDate, tags, id } = comida;
          const { history } = this.props;
          const obj = {
            image,
            name,
            category,
            area,
            id,
            history,
            doneDate,
            tags,
            index,
          };
          return (<Comida2 key={ name } inf={ obj } />);
        }));
      } if (!food) {
        const bebidas = store.filter((objetoAlcolatra) => (
          objetoAlcolatra.type === 'bebida'
        ));
        return (bebidas.map((bebida, index) => {
          const { image, name, alcoholicOrNot, doneDate, id } = bebida;
          const { history } = this.props;
          const obj = {
            image,
            name,
            alcoholicOrNot,
            id,
            doneDate,
            history,
            index,
          };
          return (<Bebida2 key={ name } inf={ obj } />);
        }));
      }
      return (store.map((item, index) => {
        if (item.type === 'bebida') {
          const { image, name, alcoholicOrNot, doneDate, id } = item;
          const { history } = this.props;
          const obj = {
            image,
            name,
            alcoholicOrNot,
            id,
            doneDate,
            history,
            index,
          };
          return (<Bebida2 key={ name } inf={ obj } />);
        } if (item.type === 'comida') {
          const { image, name, category, area, doneDate, tags, id } = item;
          const { history } = this.props;
          const obj = {
            image,
            name,
            category,
            area,
            id,
            doneDate,
            tags,
            history,
            index,
          };
          return (<Comida2 key={ name } inf={ obj } />);
        }
        return null;
      }));
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Receitas Feitas" searchOn="off" history={ history } />
        <div>
          <button
            className="btn-group col-all btn btn-danger"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => this.filtro('All') }
          >
            All
          </button>
          <button
            className="btn-group col-all btn btn-danger"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => this.filtro('Food') }
          >
            Food
          </button>
          <button
            className="btn-group col-all btn btn-danger"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filtro('Drinks') }
          >
            Drinks
          </button>
        </div>
        <div className="cards">
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
