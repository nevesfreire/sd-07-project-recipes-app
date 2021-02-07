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
  const MAX_RENDER_FILTERS = 1;
  const ZERO = 0;
  const [loading, setLoading] = useState(false);
  const [arrayListFood, setArrayListFood] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [countButtonFilter, setCountButtonFilter] = useState(ZERO);
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
    setArrayCategory(await filterFoodCategory(category));
    setCountButtonFilter((countButton) => countButton + 1);
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
      const arrayFoods = [...data.food];
      return ListCardsFood(arrayFoods);
    }
    return 'Loading...';
  };

  const showListFoodCategories = () => listFoodCategories.map((item) => (
    <button
      key={ item.strCategory }
      type="button"
      data-testid={ `${item.strCategory}-category-filter` }
      onClick={ () => getFilterFoodCategory(item.strCategory) }
    >
      {item.strCategory}
    </button>
  ));

  const renderFirstCardsFood = () => ListCardsFood(data.food);

  const optionsRender = () => {
    if (countButtonFilter > MAX_RENDER_FILTERS) {
      return renderFirstCardsFood();
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
