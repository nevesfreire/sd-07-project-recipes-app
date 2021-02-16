import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RecomendationCard from '../RecomendationCard';
import { fetchRecomendations } from '../../store/ducks/recomendations';
import StyledCarousel from './styles';

export default function Recomendation() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data: recomendations,
    isFetching } = useSelector((state) => state.recomendations);

  useEffect(() => {
    dispatch(fetchRecomendations(pathname.includes('comidas') ? 'bebidas' : 'comidas'));
  }, [dispatch, pathname]);

  return (
    <div>
      {isFetching ? <span> Loadin... </span>
        : (
          <StyledCarousel>
            { recomendations
      && recomendations.map((recipe, index) => (
        <StyledCarousel.Item
          key={ recipe.id }
          data-testid={ `${index}-recomendation-card` }
        >
          <RecomendationCard
            recipe={ recipe }
            index={ index }
          />
        </StyledCarousel.Item>
      ))}
          </StyledCarousel>
        )}
    </div>
  );
}
