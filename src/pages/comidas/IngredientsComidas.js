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
        <div className="ingGeneral">
          { meals
            ? meals.map((ingrediente, index) => {
              if (index < doze) {
                return (
                  <div className="cards">
                    <button
                      className="ing"
                      type="button"
                      key={ ingrediente.idIngredient }
                      data-testid={ `${index}-ingredient-card` }
                      onClick={ () => this.fetchRecipes(ingrediente.strIngredient) }
                    >
                      <img
                        className="card-img-top img-thumbnail"
                        src={ `https://www.themealdb.com/images/ingredients/${ingrediente.strIngredient}-Small.png` }
                        alt="Imagem do ingrediente"
                        data-testid={ `${index}-card-img` }
                      />
                      <span
                        className="card-text"
                        data-testid={ `${index}-card-name` }
                      >
                        { ingrediente.strIngredient }
                      </span>
                    </button>
                  </div>
                );
              }
              return null;
            })
            : null }
        </div>
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
