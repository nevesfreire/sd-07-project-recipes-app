import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const contextValue = {
      ...this.state,
    };

    const { children } = this.props;

    return (
      <RecipesContext.Provider value={ contextValue }>
        {children}
      </RecipesContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
