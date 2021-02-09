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
import ListCardsFoodCategory from '../components/ListCardsFoodCategory';

function Drink() {
  const FIVE = 5;
  const ZERO = 0;
  const [loading, setLoading] = useState(false);
  const [arrayListDrink, setArrayListDrink] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [renderCategory, setRenderCategory] = useState(false);
  const [categoryName, setCategoryName] = useState(undefined);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const [listDrinkCategories, setListDrinkCategories] = useState([]);

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
    if (category === categoryName) return setRenderCategory(true);
    setArrayCategory(await filterDrinkCategory(category));
    setCategoryName(category);
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

  const setsCategory = () => {
    setRenderCategory(false);
    setCategoryName(undefined);
  };

  const showListDrinkCategories = () => (
    <div>
      {
        listDrinkCategories.map((item) => (
          <button
            type="button"
            key={ item.strCategory }
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ () => getFilterDrinkCategory(item.strCategory) }
          >
            {item.strCategory}
          </button>))
      }
      <button
        type="button"
        onClick={ () => setsCategory() }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );

  const optionsRender = () => {
    if (renderCategory) {
      return ListCardsDrinkCategory(data.drink);
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

      {(arrayListDrink.length > ZERO) && showListDrinkCategories()}

      {optionsRender()}

      <Footer />
    </div>
  );
}

export default Drink;
