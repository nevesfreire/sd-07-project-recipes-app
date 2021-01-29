import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Footerdetails extends Component {
  componentDidMount() {
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
    if (pa === 'D') {
      let mensagem;
      if (!aFazer.cocktails[id]) {
        mensagem = 'Iniciar Receita';
      } else {
        mensagem = 'Continuar Receita';
      }
      return (
        <footer data-testid="footer" className="footer">
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ hi.push(`/bebidas/${id}/in-progress`) }
          >
            { mensagem }
          </button>
        </footer>
      );
    }
    let mensagem;
    const key = aFazer.meals.entries();
    if (!key.length) {
      mensagem = 'Iniciar Receita';
    } else {
      mensagem = 'Continuar Receita';
    }
    return (
      <footer data-testid="footer" className="footer">
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ hi.push(`/comidas/${id}/in-progress`) }
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
