import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomRecipe } from '../../store/ducks/recipe';
import { Header, Footer } from '../../components';

import { StyledCardText, StyledCardColumns } from './styles';
import configExplore from './config';

const RecipeExplore = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [config, setConfig] = useState(configExplore(pathname));

  const randomId = useSelector((state) => state.recipe.data.id);

  const handleClick = (link, id) => {
    if (!link.includes('explorar')) {
      history.push(`${link}${id}`);
    } else {
      history.push(link);
    }
  };

  useEffect(() => {
    if (pathname.includes('comidas')
    || pathname.includes('bebidas')) {
      dispatch(fetchRandomRecipe(pathname));
    }
    setConfig(configExplore(pathname));
  }, [dispatch, pathname]);
  return (
    <div>
      <Header
        title={ config.title }
        showSearchIcon={ false }
      />
      <StyledCardColumns>
        {config.options && config.options.map(({ link, dataTestId, text }) => (
          <StyledCardText
            key={ dataTestId }
            body
            data-testid={ dataTestId }
            onClick={ () => handleClick(link, randomId) }
          >
            {text}
          </StyledCardText>
        ))}
      </StyledCardColumns>
      <Footer />
    </div>
  );
};

export default RecipeExplore;
