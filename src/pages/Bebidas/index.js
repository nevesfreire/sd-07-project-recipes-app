import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import {
  fetchCocktailByName,
  fetchDrinkByCategory,
  stopRequired,
} from '../../redux/actions/drinkActions';
import './styles.css';

function Bebidas(props) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  function renderDrinks() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 12;
    const { drinks } = props;
    const { cocktails, isFetching } = drinks;
    if (isFetching) return <div>Loading...</div>;
    const cocktail = cocktails.slice(INITIAL_RETURN, MAX_RETURN);
    return (
      <div className="container-drinks">
        { cocktail.map((item, index) => (
          <Link
            key={ index }
            className="list-drinks"
            to={ `/bebidas/${item.idDrink}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <div data-testid={ `${index}-card-name` }>{ item.strDrink }</div>
          </Link>
        ))}
      </div>
    );
  }

  async function fetchCategories() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 5;
    const results = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    ).then((response) => response.json());
    const result = results.drinks.slice(INITIAL_RETURN, MAX_RETURN);
    setCategories(result);
  }

  function handleCategories({ target }) {
    const { fetchDrinkCategory, fetchDrink } = props;
    if (currentCategory === target.value || target.value === '') {
      setCurrentCategory('');
      return fetchDrink('');
    }
    setCurrentCategory(target.value);
    fetchDrinkCategory(target.value);
  }

  function renderCategories() {
    if (!categories) return <div>Loading Categories</div>;
    return (
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          value=""
          onClick={ handleCategories }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            value={ category.strCategory }
            onClick={ handleCategories }
          >
            { category.strCategory }
          </button>
        ))}
      </div>
    );
  }

  useEffect(() => {
    const { fetchDrink, drinks, notRequired } = props;
    if (drinks.isRequired) {
      notRequired();
    } else {
      fetchDrink('');
    }
    fetchCategories();
  }, []);

  return (
    <div>
      HEADER
      { renderCategories() }
      { renderDrinks() }
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  fetchDrink: PropTypes.func.isRequired,
  fetchDrinkCategory: PropTypes.func.isRequired,
  drinks: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool.isRequired,
    cocktails: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  notRequired: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drinks: state.cocktailsDrinks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDrink: (drink) => dispatch(fetchCocktailByName(drink)),
  fetchDrinkCategory: (drink) => dispatch(fetchDrinkByCategory(drink)),
  notRequired: () => dispatch(stopRequired()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
