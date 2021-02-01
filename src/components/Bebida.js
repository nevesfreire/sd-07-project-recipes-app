import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class Bebida extends Component {
  constructor() {
    super();
    this.copy = this.copy.bind(this);
    this.favorit = this.favorit.bind(this);
    this.Click = this.Click.bind(this);
    this.state = {
      mensagem: null,
    };
  }

  Click() {
    const { inf: { history, id } } = this.props;
    history.push(`/bebidas/${id}`);
  }

  copy() {
    const { inf: { id } } = this.props;
    const urlarray = window.location.href.split('/');
    const url = `${urlarray[0]}//${urlarray[2]}/bebidas/${id}`;
    const time = 2000;
    clipboardCopy(url);
    this.setState({ mensagem: 'Link copiado!' });
    setInterval(() => this.setState({ mensagem: null }), time);
  }

  favorit() {
    const { inf: { index, set } } = this.props;
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    store.splice(index, 1);
    set(store);
    localStorage.setItem('favoriteRecipes', JSON.stringify(store));
  }

  render() {
    const { mensagem } = this.state;
    const { inf } = this.props;
    const {
      image,
      name,
      alcoholicOrNot,
      index,
    } = inf;
    return (
      <div>
        <button
          type="button"
          onClick={ this.Click }
        >
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          <input
            type="image"
            style={ { width: '49vw' } }
            onClick={ this.Click }
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="foto"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
          </p>
        </button>
        <input
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="compartilhar"
          onClick={ () => this.copy() }
        />
        {mensagem}
        <input
          type="image"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => this.favorit() }
          src={ blackHeartIcon }
          alt="favoritar"
        />
      </div>
    );
  }
}

Bebida.propTypes = {
  inf: PropTypes.objectOf().isRequired,
};

export default Bebida;
