import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Footerdetails extends Component {
  constructor() {
    super();
    const aFazer = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!aFazer) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }),
      );
    }
  }

  render() {
    const { hi, id, pa } = this.props;
    const aFazer = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (aFazer.cocktails) {
      const keysCocktails = Object.keys(aFazer.cocktails);
      const filtroCocktails = keysCocktails.filter((key) => key === id);
      if (pa === 'D') {
        let mensagem;
        if (!filtroCocktails.length) {
          mensagem = 'Iniciar Receita';
        } else {
          mensagem = 'Continuar Receita';
        }
        return (
          <button
            className="footer btn btn-danger"
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => hi.push(`/bebidas/${id}/in-progress`) }
          >
            { mensagem }
          </button>
        );
      }
    }
    if (aFazer.meals) {
      const keysMeals = Object.keys(aFazer.meals);
      const filtroMeals = keysMeals.filter((key) => key === id);
      let mensagem;
      if (!filtroMeals.length) {
        mensagem = 'Iniciar Receita';
      } else {
        mensagem = 'Continuar Receita';
      }
      return (
        <button
          className="footer btn btn-danger"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => hi.push(`/comidas/${id}/in-progress`) }
        >
          { mensagem }
        </button>
      );
    }
  }
}

Footerdetails.propTypes = {
  hi: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  id: PropTypes.number.isRequired,
  pa: PropTypes.string.isRequired,
};

export default Footerdetails;
