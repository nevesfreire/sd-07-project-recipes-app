import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC } from '../../components';
import { loadMeals } from '../../store/ducks/receitasDeComidas/actions';

class TelaPrincipalReceitasComidas extends Component {
  componentDidMount() {
    const { loadMealsDispatch } = this.props;
    loadMealsDispatch();
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
      return (
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
  }

  render() {
    const title = 'Comidas';
    const { mealsStore } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {mealsStore
          ? this.renderMeals(mealsStore)
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mealsStore: state.receitasDeComidas.meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  loadMealsDispatch: () => dispatch(loadMeals()),
});

TelaPrincipalReceitasComidas.propTypes = {
  mealsStore: PropTypes.objectOf(PropTypes.string).isRequired,
  loadMealsDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaPrincipalReceitasComidas);
