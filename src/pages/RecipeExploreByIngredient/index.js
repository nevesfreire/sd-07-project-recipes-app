import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Header, Footer } from '../../components';

import { setFilter } from '../../store/ducks/recipes';
import { FILTER_TYPES } from '../../services/recipeAPI';
import { fetchIngredients } from '../../store/ducks/ingredients';
import { StyledCard, StyledCardColumns } from './styles';

const RecipeExploreByIngredient = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const START_INDEX = 0;
  const END_INDEX = 12;
  const { data: ingredients, isFetching } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients(pathname));
  }, [dispatch, pathname]);

  const handleClick = (term) => {
    dispatch(setFilter('explore', FILTER_TYPES.INGREDIENT, term));
    history.push(pathname.includes('comidas') ? '/comidas' : '/bebidas');
  };
  console.log(ingredients);
  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        showSearchIcon={ false }
      />
      {isFetching ? 'Loading...' : ''}
      <StyledCardColumns>
        { ingredients && ingredients.slice(START_INDEX, END_INDEX)
          .map(({ name, image }, index) => (
            <StyledCard
              className="bg-dark text-white"
              key={ name }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(name) }
            >
              <StyledCard.Img
                data-testid={ `${index}-card-img` }
                src={ image }
                alt={ `Card ${name}` }
              />
              <StyledCard.ImgOverlay>
                <StyledCard.Title
                  data-testid={ `${index}-card-name` }
                >
                  { name}
                </StyledCard.Title>
              </StyledCard.ImgOverlay>
            </StyledCard>
          ))}
      </StyledCardColumns>
      <Footer />
    </div>
  );
};

export default RecipeExploreByIngredient;
