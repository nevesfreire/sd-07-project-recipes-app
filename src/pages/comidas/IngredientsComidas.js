import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { fetchIngredients } from '../../services';
import { loadRecipesIngredent } from '../../redux/action';

class IngredientesComidas extends Component {
  constructor() {
    super();
    this.state = {
      ingredientArray: {},
    };

    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  }

  async getIngredients() {
    const ingredients = await fetchIngredients('comidas');
    this.setState({
      ingredientArray: ingredients,
    });
  }

  async fetchRecipes(ingredent) {
    const { loadrecipesingredent, history } = this.props;
    await loadrecipesingredent(ingredent, 'comidas');
    history.push('/comidas');
  }

  render() {
    const { history } = this.props;
    const { ingredientArray } = this.state;
    const { meals } = ingredientArray;
    const doze = 12;
    return (
      <div>
        <Header title="Explorar Ingredientes" searchOn="off" history={ history } />
        { meals
          ? meals.map((ingrediente, index) => {
            if (index < doze) {
              return (
                <button
                  type="button"
                  key={ ingrediente.idIngredient }
                  data-testid={ `${index}-ingredient-card` }
                  onClick={ () => this.fetchRecipes(ingrediente.strIngredient) }
                >
                  <img
                    src={ `https://www.themealdb.com/images/ingredients/${ingrediente.strIngredient}-Small.png` }
                    alt="Imagem do ingrediente"
                    data-testid={ `${index}-card-img` }
                  />
                  <span
                    data-testid={ `${index}-card-name` }
                  >
                    { ingrediente.strIngredient }
                  </span>
                </button>
              );
            }
            return null;
          })
          : null }
        <Footer history={ history } />
      </div>
    );
  }
}

IngredientesComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  loadrecipesingredent: PropTypes.objectOf().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadrecipesingredent:
    (ingredient, local) => dispatch(loadRecipesIngredent(ingredient, local)),
});

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientesComidas);
