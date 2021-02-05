import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RecomendationCard from '../RecomendationCard';
import { fetchRecomendations } from '../../store/ducks/recipes';
import StyledCarousel from './styles';

export default function Recomendation() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const recomendations = useSelector((state) => state.recipes.recomendations);

  useEffect(() => {
    dispatch(fetchRecomendations(pathname.includes('comidas') ? 'bebidas' : 'comidas'));
  }, [dispatch, pathname]);

  return (
    <StyledCarousel>
      { recomendations.map((recipe, index) => (
        <StyledCarousel.Item
          key={ recipe.id }
          data-testid={ `${index}-recomendation-card` }
        >
          <RecomendationCard
            recipe={ recipe }
          />
        </StyledCarousel.Item>
      ))}
    </StyledCarousel>
  );
}
