import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsFood from '../components/ListCardsFood';
import { getCategoryFoods, getFoodIngredients } from '../services/Api';
// import { FoodUseEfects } from '../components/FoodUseEfects';

function Food() {
  const [loading, setLoading] = useState(false);
  const [arrayListFood, setArrayListFood] = useState([]);
  const [ListFoodCategories, setListFoodCategories] = useState([]);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const FIVE = 5;
  const ZERO = 0;

  // FoodUseEfects()

  useEffect(() => {
    // console.log(data.ingredient);
    if (!data.food) setData({ ...data, food: [] });
    else if (data.food.length > ZERO) setLoading(true);
  }, [data.food]);

  useEffect(() => {
    const getListCategories = async () => {
      const listFoodCategories = await getCategoryFoods();
      listFoodCategories.length = FIVE;
      setListFoodCategories(listFoodCategories);
    };
    getListCategories();
  }, []);

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

  const showListFoodCategories = () => ListFoodCategories.map((category) => (
    <div
      key={ category.strCategory }
      data-testid={ `${category.strCategory}-category-filter` }
    >
      <button type="button">
        {category.strCategory}
      </button>
    </div>
  ));

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar />}

      {(arrayListFood.length > ZERO) && showListFoodCategories()}

      {
        (data.food === 'erro' || data.food === null)
          ? getAlert()
          : getLoading()
      }
      <Footer />
    </div>
  );
}

export default Food;
