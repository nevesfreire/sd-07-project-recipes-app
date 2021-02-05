import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Footer, CardC } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ExploreIngredientsFood,
} from '../../store/ducks/foodExploreIngredients/action';

class ExplorarComidasIng extends Component {
  async componentDidMount() {
    const { loadIngredientsFood } = this.props;
    await loadIngredientsFood();
  }

  render() {
    const title = 'Explorar Ingredientes';
    const { ingredientsFoodStore } = this.props;
    if (!ingredientsFoodStore) return <div>Loading...</div>;
    return (
      <div>
        <Header title={ title } />
        <div className="row">
          {ingredientsFoodStore.meals.map((item, index) => {
            const twelve = 12;
            if (index < twelve) {
              return (
                <div
                  className="col-6 justify-content-md-center"
                  key={ index }
                  data-testid={ `${index}-ingredient-card` }
                >
                  <div data-testid={ `${index}-card-img` } />
                  <div data-testid={ `${index}-card-name` } />
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
  ingredientsFoodStore: state.foodExploreIngredients.foodIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  loadIngredientsFood: () => dispatch(ExploreIngredientsFood()),
});

ExplorarComidasIng.propTypes = {
  loadIngredientsFood: PropTypes.func.isRequired,
  ingredientsFoodStore: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarComidasIng);
