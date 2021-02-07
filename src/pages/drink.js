import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsDrinkCategory from '../components/ListCardsDrinkCategory';
import ListCardsDrink from '../components/ListCardsDrink';
import {
  getCategoryDrinks,
  filterDrinkCategory,
  getDrinkIngredients,
} from '../services/Api';

function Drink() {
  const FIVE = 5;
  const MAX_RENDER_FILTERS = 1;
  const ZERO = 0;
  const [loading, setLoading] = useState(false);
  const [arrayListDrink, setArrayListDrink] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [countButtonFilter, setCountButtonFilter] = useState(ZERO);
  const [ListDrinkCategories, setListDrinkCategories] = useState([]);
  const { showBtn, data, setData } = useContext(RecipeContext);

  useEffect(() => {
    if (!data.drink) setData({ ...data, drink: [] });
    else if (data.drink.length > ZERO) setLoading(true);
  }, [data.drink]);

  useEffect(() => {
    const getListCategories = async () => {
      const listDrinkCategories = await getCategoryDrinks();
      listDrinkCategories.length = FIVE;
      setListDrinkCategories(listDrinkCategories);
    };
    getListCategories();
  }, []);

  const getFilterDrinkCategory = async (category) => {
    setArrayCategory(await filterDrinkCategory(category));
    setCountButtonFilter((countButton) => countButton + 1);
  };
  useEffect(() => {
    const getDrinkByIngredients = async () => {
      const getdrinkByIngredient = await getDrinkIngredients(data.ingredient);
      setArrayListDrink(getdrinkByIngredient);
    };
    if (data.ingredient) {
      getDrinkByIngredients();
    } else {
      setArrayListDrink(data.drink);
    }
  }, [data.drink]);

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };
  const getLoading = () => {
    if (loading) {
      const arrayDrinks = [...arrayListDrink];
      return ListCardsDrink(arrayDrinks);
    }
    return 'Loading...';
  };

  const showListDrinksCategories = () => ListDrinkCategories.map((category) => (
    <button
      key={ category.strCategory }
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ () => getFilterDrinkCategory(category.strCategory) }
    >
      {category.strCategory}
    </button>
  ));

  const renderFirstCardsDrink = () => ListCardsDrink(data.drink);

  const optionsRender = () => {
    if (countButtonFilter > MAX_RENDER_FILTERS) {
      return renderFirstCardsDrink();
    }

    if (arrayCategory.length > ZERO) return ListCardsDrinkCategory(arrayCategory);

    if (data.drink === 'error' || data.drink === null) {
      return getAlert();
    }
    return getLoading();
  };

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }

      {(arrayListDrink.length > ZERO) && showListDrinksCategories()}

      {optionsRender()}

      <Footer />
    </div>
  );
}

export default Drink;
