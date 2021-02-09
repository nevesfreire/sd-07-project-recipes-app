import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsFoodCategory from '../components/ListCardsFoodCategory';
import ListCardsFood from '../components/ListCardsFood';
import {
  getCategoryFoods,
  filterFoodCategory,
  getFoodIngredients,
} from '../services/Api';

function Food() {
  const FIVE = 5;
  const ZERO = 0;
  const [loading, setLoading] = useState(false);
  const [arrayListFood, setArrayListFood] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [renderCategory, setRenderCategory] = useState(false);
  const [categoryName, setCategoryName] = useState(undefined);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const [listFoodCategories, setListFoodCategories] = useState([]);

  useEffect(() => {
    if (!data.food) setData({ ...data, food: [] });
    else if (data.food.length > ZERO) setLoading(true);
  }, [data.food]);

  useEffect(() => {
    const getListCategories = async () => {
      const listFoodCategory = await getCategoryFoods();
      listFoodCategory.length = FIVE;
      setListFoodCategories(listFoodCategory);
    };
    getListCategories();
  }, []);

  const getFilterFoodCategory = async (category) => {
    if (category === categoryName) return setRenderCategory(true);
    setArrayCategory(await filterFoodCategory(category));
    setCategoryName(category);
  };
  useEffect(() => {
    const getFoodByIngredients = async () => {
      const getFoodByIngredient = await getFoodIngredients(data.ingredient);
      setArrayListFood(getFoodByIngredient);
    };
    if (data.ingredient) {
      getFoodByIngredients();
    } else {
      setArrayListFood(data.food);
    }
  }, [data.food]);

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };
  const getLoading = () => {
    if (loading) {
      const arrayFoods = [...arrayListFood];
      return ListCardsFood(arrayFoods);
    }
    return 'Loading...';
  };

  const setsCategory = () => {
    setRenderCategory(false);
    setCategoryName(undefined);
  };

  const showListFoodCategories = () => (
    <div>
      {
        listFoodCategories.map((item) => (
          <button
            type="button"
            key={ item.strCategory }
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ () => getFilterFoodCategory(item.strCategory) }
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
      return ListCardsFoodCategory(data.food);
    }

    if (arrayCategory.length > ZERO) return ListCardsFoodCategory(arrayCategory);

    if (data.food === 'error' || data.food === null) {
      return getAlert();
    }

    return getLoading();
  };

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar />}

      {(arrayListFood.length > ZERO && showListFoodCategories())}

      {optionsRender()}

      <Footer />
    </div>
  );
}

export default Food;
