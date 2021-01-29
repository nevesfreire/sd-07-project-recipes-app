import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS } from '../../components';
import CardC from '../../components/Card/CardC';

class TelaPrincipalReceitasBebidas extends Component {
  renderDrinks(drinks) {
    if (drinks.length === 1) {
      const { idDrink } = drinks;
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }
    return (
      <div className="row">
        {drinks.map((item) => (
          <div className="col-6 justify-content-md-center" key={ item.strDrink }>
            <CardC card={ item } />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const title = 'Bebidas';
    const { drinksStore } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {drinksStore ? this.renderDrinks(drinksStore) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinksStore: state.receitasDeBebidas.drinks.drinks,
});

TelaPrincipalReceitasBebidas.propTypes = {
  drinksStore: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(TelaPrincipalReceitasBebidas);
