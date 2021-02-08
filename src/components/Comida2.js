import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class Comida2 extends Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.favorit = this.favorit.bind(this);
    this.Click = this.Click.bind(this);
    this.tags = this.tags.bind(this);
    let favorit;
    const { inf: { id } } = this.props;
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (store) {
      const favorito = store.filter((element) => (element.id === id));
      if (favorito.length) {
        favorit = true;
      } else {
        favorit = false;
      }
    }
    this.state = {
      favorito: favorit,
      mensagem: null,
    };
  }

  Click() {
    const { inf: { history, id } } = this.props;
    history.push(`/comidas/${id}`);
  }

  copy() {
    const { inf: { id } } = this.props;
    const urlarray = window.location.href.split('/');
    const url = `${urlarray[0]}//${urlarray[2]}/comidas/${id}`;
    const time = 2000;
    clipboardCopy(url);
    this.setState({ mensagem: 'Link copiado!' });
    setInterval(() => this.setState({ mensagem: null }), time);
  }

  favorit() {
    const { inf } = this.props;
    const {
      image,
      name,
      category,
      area,
      index,
      id,
    } = inf;
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const receitafavoritada = {
      id,
      type: 'comida',
      area,
      category,
      alcoholicOrNot: '',
      name,
      image,
    };
    if (!store) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([receitafavoritada]));
      this.setState({ favorito: true });
    } else {
      const favorito = store.filter((element) => (element.id === id));
      if (!favorito.length) {
        console.log(favorito);
        store.push(receitafavoritada);
        localStorage.setItem('favoriteRecipes', JSON.stringify(store));
        this.setState({ favorito: true });
      } else {
        store.splice(index, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(store));
        this.setState({ favorito: false });
      }
    }
  }

  tags() {
    const { inf: { index, tags } } = this.props;
    return (tags.map((tag, ind) => (
      <p key={ ind } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </p>
    )));
  }

  render() {
    const { mensagem, favorito } = this.state;
    const { inf } = this.props;
    const {
      image,
      name,
      category,
      area,
      index,
      doneDate,
    } = inf;
    return (
      <div>
        <button
          className="btn"
          type="button"
          onClick={ this.Click }
        >
          <h4 className="display-6" data-testid={ `${index}-horizontal-name` }>{name}</h4>
          <input
            className="img-fluid img-thumbnail"
            style={ { width: '49vw' } }
            type="image"
            onClick={ this.Click }
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="foto"
          />
          <h5 className="display-5" data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </h5>
          <p className="display-6" data-testid={ `${index}-horizontal-done-date` }>
            { doneDate }
          </p>
        </button>
        <input
          className="btn"
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="compartilhar"
          onClick={ () => this.copy() }
        />
        {mensagem}
        <input
          className="btn"
          type="image"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => this.favorit() }
          src={ favorito ? blackHeartIcon : whiteHeartIcon }
          alt="favoritar"
        />
      </div>
    );
  }
}

Comida2.propTypes = {
  inf: PropTypes.objectOf().isRequired,
};

export default Comida2;
