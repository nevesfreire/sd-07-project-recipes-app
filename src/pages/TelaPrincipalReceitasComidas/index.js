import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CardC from '../../components/Card/CardC';
import { HeaderS } from '../../components';

class TelaPrincipalReceitasComidas extends Component {
  renderMeals(meals) {
    if (meals.length === 1) {
      const { idMeal } = meals;
      return <Redirect to={ `/comidas/${idMeal}` } />;
    }
    return (
      <div className="row">
        {meals.map((item) => (
          <div className="col-6 justify-content-md-center" key={ item.strMeals }>
            <CardC card={ item } />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const title = 'Comida';
    const { mealsStore } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {mealsStore ? this.renderMeals(mealsStore) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mealsStore: state.receitasDeComidas.meals.meals,
});

TelaPrincipalReceitasComidas.propTypes = {
  mealsStore: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(TelaPrincipalReceitasComidas);
