import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const zero = 0;
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [url, setUrl] = useState('');
  const [searching, setSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [cards, setCards] = useState([]);
  const [optionSearch, setOptionSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [loadResults, setLoadResults] = useState(false);
  const [clickDrinkSurprise, setClickDrinkSurprise] = useState(zero);
  const [clickExecSearch, setClickExecSearch] = useState(zero);
  const [title, setTitle] = useState('');
  const [clickMealSurprise, setClickMealSurprise] = useState(zero);
  const [clickSearchIcon, setClickSearchIcon] = useState(zero);
  const [mealIngredient, setMealIngredient] = useState('');

  const history = useHistory();

  const handleUrlChange = () => {
    setUrl(history.location.pathname);
  };

  useEffect(() => {
    handleUrlChange();
  }, []);

  return (
    <RecipesContext.Provider
      value={
        {
          setEmail,
          setSenha,
          email,
          senha,
          url,
          setUrl,
          searching,
          setSearching,
          isFetching,
          setIsFetching,
          setOptionSearch,
          setInputSearch,
          optionSearch,
          inputSearch,
          setCards,
          cards,
          loadResults,
          setLoadResults,
          clickDrinkSurprise,
          setClickDrinkSurprise,
          clickExecSearch,
          setClickExecSearch,
          title,
          setTitle,
          clickMealSurprise,
          setClickMealSurprise,
          clickSearchIcon,
          setClickSearchIcon,
          mealIngredient,
          setMealIngredient }
      }
    >
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Provider;
