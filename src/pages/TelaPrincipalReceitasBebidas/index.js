import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC, Footer } from '../../components';
import {
  loadDrinks,
  loadDrinksCategories,
  getByCategorieDrinks,
} from '../../store/ducks/receitasDeBebidas/actions';

class TelaPrincipalReceitasBebidas extends Component {
  constructor() {
    super();
    this.state = {
      toggleFilter: false,
      currentCategory: '',
    };
  }

  async componentDidMount() {
    const { loadDrinksDispatch, getCategoriesDispatch } = this.props;
    getCategoriesDispatch();
    await loadDrinksDispatch();
  }

  handlePagerediRection(item) {
    const { history } = this.props;
    history.push(`/bebidas/${item.idDrink}`);
  }

  async getDrinksCategorie(e) {
    const drinkCategorie = e.target.innerHTML;
    const { getByCategorieDrinksD, loadDrinksDispatch } = this.props;
    const { toggleFilter, currentCategory } = this.state;
    if (!toggleFilter || currentCategory !== drinkCategorie) {
      await getByCategorieDrinksD(drinkCategorie);
      this.setState({ toggleFilter: true, currentCategory: drinkCategorie });
    } else {
      await loadDrinksDispatch();
      this.setState({ toggleFilter: false, currentCategory: '' });
    }
  }

  renderCategories(categories) {
    const five = 5;
    const { loadDrinksDispatch } = this.props;
    return (
      <div>
        {categories.map((categorie, index) => {
          if (index < five) {
            return (
              <button
                type="button"
                key={ categorie.strCategory }
                data-testid={ `${categorie.strCategory}-category-filter` }
                onClick={ (e) => this.getDrinksCategorie(e) }
              >
                {categorie.strCategory}
              </button>
            );
          }
          return null;
        })}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => loadDrinksDispatch() }
        >
          All
        </button>
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
                onClick={ () => this.handlePagerediRection(item) }
                onKeyDown={ () => this.handlePagerediRection(item) }
                role="button"
                tabIndex={ 0 }
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
        <Footer />
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
  getByCategorieDrinksD: (categorie) => dispatch(getByCategorieDrinks(categorie)),
});

TelaPrincipalReceitasBebidas.propTypes = {
  categoriesStore: PropTypes.arrayOf(PropTypes.object).isRequired,
  drinksStore: PropTypes.objectOf(PropTypes.string).isRequired,
  loadDrinksDispatch: PropTypes.func.isRequired,
  getCategoriesDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getByCategorieDrinksD: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelaPrincipalReceitasBebidas);
