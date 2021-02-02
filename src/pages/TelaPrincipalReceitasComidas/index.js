import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC, Footer } from '../../components';
import {
  loadMeals,
  loadMealsCategories,
} from '../../store/ducks/receitasDeComidas/actions';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';

class TelaPrincipalReceitasComidas extends Component {
  async componentDidMount() {
    const { loadMealsDispatch, getCategoriesDispatch } = this.props;
    loadMealsDispatch();
    await getCategoriesDispatch();
  }

  handlePagerediRection(item) {
    const { getDetailedMealDispatch } = this.props;
    getDetailedMealDispatch(item.idMeal);
    window.location.replace(`/comidas/${item.idMeal}`);
  }

  renderMeals(meals) {
    if (meals.length === 1) {
      const { idMeal } = meals[0];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    }

    return (
      <div className="row">
        {meals.map((item, index) => {
          const twelve = 12;
          if (index < twelve) {
            return (
              <div
                className="col-6 justify-content-md-center"
                data-testid={ `${index}-recipe-card` }
                key={ item.strMeals }
                onClick={ () => this.handlePagerediRection(item) }
                onKeyDown={ () => this.handlePagerediRection(item) }
                role="button"
                tabIndex={ 0 }
              >
                <CardC card={ item } indexMeal={ index } />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  renderAlert(meals) {
    if (!meals) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
  }

  renderCategories(categories) {
    const five = 5;
    return (
      <div>
        {categories.map((categorie, index) => {
          if (index < five) {
            return (
              <button
                type="button"
                key={ categorie.strCategory }
                data-testid={ `${categorie.strCategory}-category-filter` }
              >
                {categorie.strCategory}
              </button>
            );
          }
          return null;
        })}
      </div>
    );
  }

  render() {
    const title = 'Comidas';
    const { mealsStore/* , categoriesStore */ } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {mealsStore
          ? this.renderMeals(mealsStore)
          : this.renderAlert(mealsStore)}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mealsStore: state.receitasDeComidas.meals.meals,
  categoriesStore: state.receitasDeComidas.categories.meals,
});

const mapDispatchToProps = (dispatch) => ({
  loadMealsDispatch: () => dispatch(loadMeals()),
  getCategoriesDispatch: () => dispatch(loadMealsCategories()),
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
});

TelaPrincipalReceitasComidas.propTypes = {
  mealsStore: PropTypes.objectOf(PropTypes.string).isRequired,
  loadMealsDispatch: PropTypes.func.isRequired,
  getCategoriesDispatch: PropTypes.func.isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
  // categoriesStore: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelaPrincipalReceitasComidas);
