import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import { fetchFoodByName, fetchFoodByCategory } from '../../redux/actions/foodActions';
import './styles.css';

function Comidas(props) {
  const [categories, setCategories] = useState([]);

  function renderComidas() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 12;
    const { foods } = props;
    const { meals, isFetching } = foods;
    if (isFetching) return <div>Loading...</div>;
    const comida = meals.slice(INITIAL_RETURN, MAX_RETURN);
    return (
      <div className="container-foods">
        { comida.map((item, index) => (
          <Link
            key={ index }
            className="list-foods"
            to={ `/comidas/${item.idMeal}` }
          >
            <img src={ item.strMealThumb } alt={ item.strMeal } />
            <div>{ item.strMeal }</div>
          </Link>
        ))}
      </div>
    );
  }

  async function fetchCategories() {
    const INITIAL_RETURN = 0;
    const MAX_RETURN = 5;
    const results = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    ).then((response) => response.json());
    const result = results.meals.slice(INITIAL_RETURN, MAX_RETURN);
    setCategories(result);
  }

  function handleCategories({ target }) {
    const { fetchFoodCategory } = props;
    fetchFoodCategory(target.value);
  }

  function renderCategories() {
    if (!categories) return <div>Loading Categories</div>;
    return (
      <div>
        <button
          type="button"
          data-testid="all-category-filter"
          value="All"
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
    const { fetchFood } = props;
    fetchFood('');
    fetchCategories();
  }, []);

  return (
    <div>
      HEADER
      { renderCategories() }
      { renderComidas() }
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  fetchFood: PropTypes.func.isRequired,
  fetchFoodCategory: PropTypes.func.isRequired,
  foods: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  foods: state.foodMeals,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (food) => dispatch(fetchFoodByName(food)),
  fetchFoodCategory: (food) => dispatch(fetchFoodByCategory(food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
