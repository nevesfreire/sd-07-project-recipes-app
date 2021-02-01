import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC } from '../../components';
import {
  loadDrinks,
  loadDrinksCategories,
} from '../../store/ducks/receitasDeBebidas/actions';

class TelaPrincipalReceitasBebidas extends Component {
  async componentDidMount() {
    const { loadDrinksDispatch, getCategoriesDispatch } = this.props;
    getCategoriesDispatch();
    await loadDrinksDispatch();
  }

  renderCategories(categories) {
    const five = 5;
    return (
      <div>
        {categories.map((categorie, index) => {
          if (index < five) {
            return (
              <button type="button" key={ categorie.strCategory }>
                {categorie.strCategory}
              </button>
            );
          } return null;
        })}
      </div>
    );
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
    const { drinksStore, categoriesStore } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {categoriesStore ? this.renderCategories(categoriesStore) : null}
        {drinksStore ? this.renderDrinks(drinksStore) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinksStore: state.receitasDeBebidas.drinks.drinks,
  categoriesStore: state.receitasDeBebidas.categories.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  loadDrinksDispatch: () => dispatch(loadDrinks()),
  getCategoriesDispatch: () => dispatch(loadDrinksCategories()),
});

TelaPrincipalReceitasBebidas.propTypes = {
  categoriesStore: PropTypes.arrayOf(PropTypes.object).isRequired,
  drinksStore: PropTypes.objectOf(PropTypes.string).isRequired,
  loadDrinksDispatch: PropTypes.func.isRequired,
  getCategoriesDispatch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelaPrincipalReceitasBebidas);
