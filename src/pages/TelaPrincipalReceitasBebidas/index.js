import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS } from '../../components';
import CardC from '../../components/Card/CardC';

class TelaPrincipalReceitasBebidas extends Component {
  renderDrinks(drinks) {
    const zero = 0;
    if (drinks.length === 1) {
      const { idDrink } = drinks[0];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }
    if (drinks.length === zero) {
      return this.renderAlert();
    }
    return (
      <div className="row">
        {drinks.map((item, index) => {
          const twelve = 12;
          if (index < twelve) {
            return (
              <div
                className="col-6 justify-content-md-center"
                key={ item.strDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <CardC card={ item } indexDrink={ index } />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  renderAlert(drinks) {
    if (!drinks) {
      return (
        <Alert variant="danger">
          Sinto muito, não encontramos nenhuma receita para esses filtros.
        </Alert>
      );
    }
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
