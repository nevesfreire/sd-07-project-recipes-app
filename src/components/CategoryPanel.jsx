import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApi, getFoodList, getDrinksList } from '../services/fetchApi';
import CategoryButton from './CategoryButton';

const newFunc = async (pathname, setCategories) => {
  if (pathname === '/comidas') {
    const list = await fetchApi(getFoodList);
    const { meals } = list;
    setCategories(meals);
  } else if (pathname === '/bebidas') {
    const list = await fetchApi(getDrinksList);
    const { drinks } = list;
    setCategories(drinks);
  }
};

const CategoryPanel = () => {
  // const { state, setRecipesUrl } = useContext(context);
  const [categories, setCategories] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  const maxCategories = 5;

  useEffect(() => {
    newFunc(pathname, setCategories);
  }, [pathname]);
  if (!categories) return <div>Loading...</div>;
  return (
    categories.filter((_categories, index) => index < maxCategories)
      .map((category, index) => {
        const { strCategory } = category;
        return (
          <CategoryButton
            key={ index }
            pathname={ pathname }
            category={ strCategory }
          />
        );
      })
  );
};

export default CategoryPanel;
