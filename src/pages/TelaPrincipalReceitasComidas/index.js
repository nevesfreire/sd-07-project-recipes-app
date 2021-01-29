import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { HeaderS, CardC } from '../../components';

class TelaPrincipalReceitasComidas extends Component {
  renderMeals(meals) {
    if (meals.length === 1) {
      const { idMeal } = meals;
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
                key={ item.strMeals }
              >
                <CardC card={ item } />
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
        <Alert variant="danger">
          Sinto muito, não encontramos nenhuma receita para esses filtros.
        </Alert>
      );
    }
  }

  render() {
    const title = 'Comida';
    const { mealsStore } = this.props;
    return (
      <div>
        <HeaderS title={ title } />
        {mealsStore
          ? this.renderMeals(mealsStore)
          : this.renderAlert(mealsStore)}
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
