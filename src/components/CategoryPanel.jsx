import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
// import { fetchApi, getFoodList, getDrinksList } from '../services/fetchApi';
import CategoryButton from './CategoryButton';

const listCategories = async (pathname, setCategories, state) => {
  if (pathname === '/comidas') {
    setCategories(state.categories.food);
  } else if (pathname === '/bebidas') {
    setCategories(state.categories.beverage);
  }
};

const CategoryPanel = () => {
  const { state } = useContext(context);
  const [categories, setCategories] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  const maxCategories = 5;

  useEffect(() => {
    listCategories(pathname, setCategories, state);
  }, [pathname, state]);

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
