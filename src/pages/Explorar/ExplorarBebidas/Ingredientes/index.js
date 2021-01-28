import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../../../components/Footer';
import {
  fetchCocktailByIngredient,
  requestRequired
} from '../../../../redux/actions/drinkActions';
import './styles.css';

function ExplorarBebidasIngredientes(props) {
  const [ingredients, setIngredients] = useState([]);

  async function fetchIngredients() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 12;
    const results = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    ).then((response) => response.json());
    const result = results.drinks.slice(INITIAL_RETURN, MAX_RETURN);
    setIngredients(result);
  }

  function handleIngredient({ target }) {
    const { request, fetchDrinksIngredient } = props;
    const result = target.alt.replace(' ', '_');
    request();
    fetchDrinksIngredient(result);
  }

  function renderMeals() {

    if(!ingredients) return (<div>Loading...</div>)
    return (
      <div className="container-foods">
        { ingredients.map((item, index) => (
          <Link
            key={ index }
            onClick={ handleIngredient }
            to="/bebidas"
            className="list-foods"
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Medium.png` }
              alt={ item.strIngredient1 }
            />
            <div>{ item.strIngredient1 }</div>
          </Link>
        ))}
      </div>
    );
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      HEADER
      { renderMeals() }
      <Footer />
    </div>
  );
}

ExplorarBebidasIngredientes.propTypes = {
  fetchDrinksIngredient: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drinks: state.cocktailsDrinks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDrinksIngredient: (drink) => dispatch(fetchCocktailByIngredient(drink)),
  request: (drink) => dispatch(requestRequired(drink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarBebidasIngredientes);
