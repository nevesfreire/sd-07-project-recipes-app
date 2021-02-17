import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipesByFilter } from '../../store/ducks/recipes';
import {
  RecipeCardList,
  RecipeCategoryFilter,
  Header,
  Footer,
  RecipeAreaFilter } from '../../components';
import Container from './styles';

const Home = () => {
  const { filterOrigin, filter } = useSelector((state) => state.recipes);
  const [title, setTitle] = useState('');

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (filterOrigin) {
    case 'searchbar':
    case 'home':
    case 'explore':
      dispatch(fetchRecipesByFilter(pathname, filter.type, filter.term));
      break;
    default:
      dispatch(fetchRecipesByFilter(pathname));
    }

    if (pathname.includes('explorar')) {
      setTitle('Explorar Origem');
    } else if (pathname.includes('comidas')) {
      setTitle('Comidas');
    } else {
      setTitle('Bebidas');
    }
  }, [dispatch, pathname, filterOrigin, filter]);

  return (
    <Container>
      <Header
        title={ title }
        showSearchIcon
      />
      { pathname.includes('explorar')
        ? <RecipeAreaFilter />
        : <RecipeCategoryFilter />}
      <RecipeCardList />
      <Footer />
    </Container>
  );
};

export default Home;
