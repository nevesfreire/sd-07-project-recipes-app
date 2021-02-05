import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsDrink from '../components/ListCardsDrink';
import { getCategoryDrinks, getDrinkIngredients } from '../services/Api';

function Drink() {
  const [loading, setLoading] = useState(false);
  const [arrayListDrinks, setArrayListDrinks] = useState([]);
  const [ListFoodCategories, setListFoodCategories] = useState([]);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const FIVE = 5;
  const ZERO = 0;

  useEffect(() => {
    if (!data.drink) setData({ ...data, drink: [] });
    else if (data.drink.length > ZERO) setLoading(true);
  }, [data.drink]);

  useEffect(() => {
    const getListCategories = async () => {
      const listDrinkCategories = await getCategoryDrinks();
      listDrinkCategories.length = FIVE;
      setListFoodCategories(listDrinkCategories);
    };
    getListCategories();
  }, []);

  useEffect(() => {
    const getDrinkByIngredients = async () => {
      const getdrinkByIngredient = await getDrinkIngredients(data.ingredient);
      console.log(data.ingredient);
      console.log(getdrinkByIngredient);
      setArrayListDrinks(getdrinkByIngredient);
    };
    if (data.ingredient) {
      getDrinkByIngredients();
    } else {
      setArrayListDrinks(data.drink);
    }
  }, [data.drink]);

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };

  const getLoading = () => {
    if (loading) {
      const arrayListDrink = [...arrayListDrinks];
      return ListCardsDrink(arrayListDrink);
    }
    return 'Loading...';
  };

  const showListDrinksCategories = () => ListFoodCategories.map((category) => (
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
      { showBtn && <SearchHeaderBar /> }

      {(arrayListDrinks.length > ZERO) && showListDrinksCategories()}

      {
        (data.drink === 'erro' || data.drink === null)
          ? getAlert()
          : getLoading()
      }
      <Footer />
    </div>
  );
}

export default Drink;
