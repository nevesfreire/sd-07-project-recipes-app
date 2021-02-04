import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC } from '../../components';
import {
  loadMeals,
  loadMealsCategories,
  getByCategorieMeals,
} from '../../store/ducks/receitasDeComidas/actions';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';

class TelaPrincipalReceitasComidas extends Component {
  constructor() {
    super();
    this.state = {
      toggleFilter: false,
      currentCategory: '',
    };
  }

  async componentDidMount() {
    const { loadMealsDispatch, getCategoriesDispatch } = this.props;
    loadMealsDispatch();
    await getCategoriesDispatch();
  }

  async handlePagerediRection(item) {
    const { history } = this.props;
    history.push(`/comidas/${item.idMeal}`);
  }

  async getMealsCategorie(e) {
    const mealCategorie = e.target.innerHTML;
    const { getByCategorieMealsD, loadMealsDispatch } = this.props;
    const { toggleFilter, currentCategory } = this.state;
    if (!toggleFilter || currentCategory !== mealCategorie) {
      this.setState({ toggleFilter: true, currentCategory: mealCategorie });
      await getByCategorieMealsD(mealCategorie);
    } else {
      this.setState({ toggleFilter: false, currentCategory: '' });
      await loadMealsDispatch();
    }
  }

  renderMeals(meals) {
    const { toggleFilter } = this.state;
    if (meals.length === 1 && !toggleFilter) {
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
    const { loadMealsDispatch } = this.props;
    return (
      <div>
        {categories.map((categorie, index) => {
          if (index < five) {
            return (
              <button
                type="button"
                key={ categorie.strCategory }
                data-testid={ `${categorie.strCategory}-category-filter` }
                onClick={ (e) => this.getMealsCategorie(e) }
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
          onClick={ () => loadMealsDispatch() }
        >
          All
        </button>
      </div>
    );
  }

  render() {
    const title = 'Comidas';
    const { mealsStore, categoriesStore } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {categoriesStore ? this.renderCategories(categoriesStore) : null}
        {mealsStore ? this.renderMeals(mealsStore) : null}
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
  getByCategorieMealsD: (categorie) => dispatch(getByCategorieMeals(categorie)),
});

TelaPrincipalReceitasComidas.propTypes = {
  mealsStore: PropTypes.objectOf(PropTypes.string).isRequired,
  loadMealsDispatch: PropTypes.func.isRequired,
  getCategoriesDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  categoriesStore: PropTypes.objectOf(PropTypes.string).isRequired,
  getByCategorieMealsD: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelaPrincipalReceitasComidas);
