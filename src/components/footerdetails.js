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
    const keysMeals = Object.keys(aFazer.meals);
    const keysCocktails = Object.keys(aFazer.cocktails);
    const filtroMeals = keysMeals.filter((key) => key === id);
    const filtroCocktails = keysCocktails.filter((key) => key === id);
    if (pa === 'D') {
      let mensagem;
      if (!filtroCocktails.length) {
        mensagem = 'Iniciar Receita';
      } else {
        mensagem = 'Continuar Receita';
      }
      return (
        <footer data-testid="footer" className="footer">
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => hi.push(`/bebidas/${id}/in-progress`) }
          >
            { mensagem }
          </button>
        </footer>
      );
    }
    let mensagem;
    if (!filtroMeals.length) {
      mensagem = 'Iniciar Receita';
    } else {
      mensagem = 'Continuar Receita';
    }
    return (
      <footer data-testid="footer" className="footer">
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => hi.push(`/comidas/${id}/in-progress`) }
        >
          { mensagem }
        </button>
      </footer>
    );
  }
}

Footerdetails.propTypes = {
  hi: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  id: PropTypes.number.isRequired,
  pa: PropTypes.string.isRequired,
};

export default Footerdetails;
