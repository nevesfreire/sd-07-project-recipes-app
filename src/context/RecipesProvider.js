import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const zero = 0;
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [searching, setSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [cards, setCards] = useState([]);
  const [endpoint, setEndpoint] = useState('');
  const [optionSearch, setOptionSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [loadResults, setLoadResults] = useState(false);
  const [clickDrinkSurprise, setClickDrinkSurprise] = useState(zero);
  const [clickExecSearch, setClickExecSearch] = useState(zero);
  const [clickMealSurprise, setClickMealSurprise] = useState(zero);
  const [clickSearchIcon, setClickSearchIcon] = useState(zero);
  const [idDetail, setIdDetail] = useState();

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
          endpoint,
          setEndpoint,
          idDetail,
          setIdDetail }
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
