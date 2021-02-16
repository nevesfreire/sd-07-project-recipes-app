import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipesByFilter } from '../../store/ducks/recipes';
import { RecipeCardList, RecipeCategoryFilter, Header, Footer } from '../../components';
import Container from './styles';

const Home = () => {
  const { filterOrigin, filter } = useSelector((state) => state.recipes);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (filterOrigin) {
    case 'searchbar':
    case 'home':
      dispatch(fetchRecipesByFilter(pathname, filter.type, filter.term));
      break;
    default:
      dispatch(fetchRecipesByFilter(pathname));
    }
  }, [dispatch, pathname, filterOrigin, filter]);

  return (
    <Container>
      <Header
        title={ pathname.includes('comidas') ? 'Comidas' : 'Bebidas' }
        showSearchIcon
      />
      <RecipeCategoryFilter />
      <RecipeCardList />
      <Footer />
    </Container>
  );
};

export default Home;
