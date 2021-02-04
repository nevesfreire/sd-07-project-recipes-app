import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Footer, CardC } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ExploreIngredientsDrink,
} from '../../store/ducks/drinkExploreIngredients/action';

class ExplorarBebidasIng extends Component {
  async componentDidMount() {
    const { loadIngredientsDrink } = this.props;
    await loadIngredientsDrink();
  }

  render() {
    const title = 'Explorar Ingredientes';
    const { ingredientsDrinkStore } = this.props;
    console.log('test');
    console.log(ingredientsDrinkStore);
    return (
      <div>
        <Header title={ title } />
        <div className="row">
          {ingredientsDrinkStore.map((item, index) => {
            const twelve = 12;
            if (index < twelve) {
              return (
                <div
                  className="col-6 justify-content-md-center"
                  key={ index }
                  data-testid={ `${index}-ingredient-card` }
                >
                  <CardC card={ item } indexDrink={ index } />
                </div>
              );
            }
            return null;
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredientsDrinkStore: state.drinkExploreIngredients.drinkIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  loadIngredientsDrink: () => dispatch(ExploreIngredientsDrink()),
});

ExplorarBebidasIng.propTypes = {
  loadIngredientsDrink: PropTypes.func.isRequired,
  // ingredientsDrinkStore: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarBebidasIng);
