import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TitleHeader extends Component {
  constructor() {
    super();
    this.state = {
      h1: '',
    };
    this.ajustingStatesWithH1 = this.ajustingStatesWithH1.bind(this);
  }

  componentDidMount() {
    this.ajustingStatesWithH1();
  }

  ajustingStatesWithH1() {
    const { pathname } = this.props;
    if (pathname === '/bebidas') {
      this.setState({
        h1: 'Bebidas',
      });
    }
    if (pathname === '/comidas') {
      this.setState({
        h1: 'Comidas',
      });
    }
    if (pathname === '/explorar') {
      this.setState({
        h1: 'Explorar',
      });
    }
    if (pathname === '/explorar/comidas') {
      this.setState({
        h1: 'Explorar Comidas',
      });
    }
    if (pathname === '/explorar/bebidas') {
      this.setState({
        h1: 'Explorar Bebidas',
      });
    }
    if (pathname === '/explorar/comidas/ingredientes') {
      this.setState({
        h1: 'Explorar Ingredientes',
      });
    }
    if (pathname === '/explorar/bebidas/ingredientes') {
      this.setState({
        h1: 'Explorar Ingredientes',
      });
    }
    if (pathname === '/explorar/comidas/area') {
      this.setState({
        h1: 'Explorar Origem',
      });
    }
    if (pathname === '/explorar/bebidas/area') {
      this.setState({
        h1: 'Explorar Origem',
      });
    }
    if (pathname === '/perfil') {
      this.setState({
        h1: 'Perfil',
      });
    }
    if (pathname === '/receitas-feitas') {
      this.setState({
        h1: 'Receitas Feitas',
      });
    }
    if (pathname === '/receitas-favoritas') {
      this.setState({
        h1: 'Receitas Favoritas',
      });
    }
  }

  render() {
    const { h1 } = this.state;
    return (
      <h1 data-testid="page-title">
        {h1}
      </h1>
    );
  }
}

TitleHeader.propTypes = {
  pathname: PropTypes.string.isRequired,
};
