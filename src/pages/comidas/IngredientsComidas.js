import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { fetchFoodId, fetchFoodIngredient } from '../../services';
import { despachoReceitas } from '../../redux/action'; // fazer uma forma de atender o requisito 77

class IngredientesComidas extends Component {
  constructor() {
    super();
    this.state = {
      ingredientArray: [],
    };

    this.atualizaState = this.atualizaState.bind(this);
  }

  async componentDidMount() {
    const receita = await fetchFoodId('52772', 'comidas');
    const ingredients = receita.meals[0];
    const ingredientArray = [];
    const max = 12;
    for (let i = 1; i <= max; i += 1) {
      const chave = `strIngredient${i}`;
      if (ingredients[chave]) {
        ingredientArray.push(ingredients[chave]);
      }
    }
    this.atualizaState(ingredientArray);
  }

  atualizaState(data) {
    this.setState({
      ingredientArray: data,
    });
  }

  render() {
    const { history } = this.props;
    const { ingredientArray } = this.state;
    return (
      <div>
        <Header title="Explorar Ingredientes" searchOn="off" history={ history } />
        { ingredientArray.map((ingrediente) => (
          <button type="button" key={ ingrediente } data-testid="index-ingredient-card">
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingrediente}-Small.png` }
              alt="Imagem do ingrediente"
              data-testid="index-card-img"
            />
            <span data-testid="index-card-img">{ ingrediente }</span>
          </button>
        )) }
        <Footer history={ history } />
      </div>
    );
  }
}

IngredientesComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  despachoreceitas: (e) => dispatch(despachoReceitas(e)),
});

export default connect(null, mapDispatchToProps)(IngredientesComidas);
