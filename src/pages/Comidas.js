import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardList from '../components/CardList';
import CategoryBar from '../components/CategoryBar';

import { fetchGlobalMeal,
  fetchMealCategory,
  fetchMealByCategory,
  fetchMealByIngredients,
  fetchMealByName,
  fetchMealByFirstLetter } from '../services/API';

function Comidas() {
  const [globalMeal, setGlobalMeal] = useState([]);
  const [mealCategories, setmealCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [typeOfFetch, setFetch] = useState('');
  const [valueToFetch, setValueToFetch] = useState('');
  const [filteredBySearchBar, setFilteredBySearchBar] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);

  const noFindRecipe = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const magicNumberZero = 0;

  const history = useHistory();

  const redirectToDetails = () => {
    if (dataToRender.length === 1 && category === '') {
      history.push(`/comidas/${dataToRender[0].idMeal}`);
    }
  };

  const getGlobalMealData = async () => {
    const data = await fetchGlobalMeal();
    setGlobalMeal(data);
  };

  const getCategoriesMealData = async () => {
    const data = await fetchMealCategory();
    setmealCategories(data);
  };

  useEffect(() => {
    getGlobalMealData();
    getCategoriesMealData();
  }, []);

  useEffect(() => {
    async function getMealsByCategory() {
      if (category) setFilteredByCategory(await fetchMealByCategory(category));
    }
    getMealsByCategory();
  }, [category]);

  const getEndPointAndFetch = async () => {
    setFilteredByCategory([]);
    switch (typeOfFetch) {
    case 'ingredient': {
      const fetchValue = await fetchMealByIngredients(valueToFetch);
      return fetchValue ? setFilteredBySearchBar(fetchValue) : alert(noFindRecipe);
    }
    case 'name': {
      const fetchValue = await fetchMealByName(valueToFetch);
      return fetchValue ? setFilteredBySearchBar(fetchValue) : alert(noFindRecipe);
    }
    case 'first-letter': {
      if (valueToFetch.length === 1) {
        const fetchValue = await fetchMealByFirstLetter(valueToFetch);
        if (fetchValue) {
          setFilteredBySearchBar(fetchValue);
        } if (!fetchValue) {
          alert(noFindRecipe);
        }
      } else if (valueToFetch !== 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }

      break;
    }
    default: {
      return fetchGlobalMeal();
    }
    }
  };
  useEffect(() => {
    const dataToRenderFunction = () => {
      if ((filteredByCategory.length === magicNumberZero || category === '')
        && (filteredBySearchBar.length === magicNumberZero || valueToFetch === '')) {
        return setDataToRender(globalMeal);
      } if (filteredByCategory.length > magicNumberZero) {
        return setDataToRender(filteredByCategory);
      } if (filteredBySearchBar.length > magicNumberZero) {
        return setDataToRender(filteredBySearchBar);
      }
    };
    dataToRenderFunction();
  }, [category, filteredByCategory, filteredBySearchBar, globalMeal, valueToFetch]);

  return (
    <div>
      <Header
        title="Comidas"
        hideSearchIcon="false"
        typeOfCategory="Meal"
        setFetch={ setFetch }
        setValueToFetch={ setValueToFetch }
        getEndPointAndFetch={ getEndPointAndFetch }
      />
      { !redirectToDetails()
      && <CategoryBar
        arrayOfCategories={ mealCategories }
        typeOfCategory="Meal"
        setCategory={ setCategory }
        category={ category }
      />}
      <CardList
        arrayOfCard={ dataToRender }
        typeOfCard="Meal"
      />
      <Footer />
    </div>
  );
}

export default Comidas;
