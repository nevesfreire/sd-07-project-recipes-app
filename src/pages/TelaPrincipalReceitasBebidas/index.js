import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC } from '../../components';
import { loadDrinks } from '../../store/ducks/receitasDeBebidas/actions';

class TelaPrincipalReceitasBebidas extends Component {
  componentDidMount() {
    const { loadDrinksDispatch } = this.props;
    loadDrinksDispatch();
  }

  renderDrinks(drinks) {
    if (drinks.length === 1) {
      const { idDrink } = drinks[0];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
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

const mapDispatchToProps = (dispatch) => ({
  loadDrinksDispatch: () => dispatch(loadDrinks()),
});

TelaPrincipalReceitasBebidas.propTypes = {
  drinksStore: PropTypes.objectOf(PropTypes.string).isRequired,
  loadDrinksDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaPrincipalReceitasBebidas);
