import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Input,
  Radio,
  Button,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import radioData from '../data/helperParam';
import context from '../contextAPI/context';
import useSendRequestBtn from '../hooks/useSendRequestBtn';

const inputSearchBar = (HandleTextChange) => (
  <div className="input-searchbar">
    <Input
      data-testid="search-input"
      type="text"
      name="search"
      placeholder="sua busca aqui"
      onChange={ HandleTextChange }
    />
  </div>
);

const radioButtons = (HandleRadioBtnChange) => (
  <div className="radio-controll">
    <FormControl component="fieldset">
      <FormLabel component="legend">Receitas</FormLabel>
      <RadioGroup
        aria-label="option"
        name="Receitas"
        onChange={ HandleRadioBtnChange }
      >
        <div className="field-set">
          <FormControlLabel
            data-testid="ingredient-search-radio"
            value="ingredient"
            name="ingredient"
            control={ <Radio /> }
            label="Ingrediente"
          />
          <FormControlLabel
            data-testid="name-search-radio"
            value="byName"
            name="byName"
            control={ <Radio /> }
            label="Nome"
          />
          <FormControlLabel
            data-testid="first-letter-search-radio"
            value="firstChar"
            name="firstChar"
            control={ <Radio /> }
            label="Primeira letra"
          />
        </div>
      </RadioGroup>
    </FormControl>
  </div>
);

function filterSelection(path, state) {
  const { radio } = radioData;
  let alter;
  let arr;
  const {
    radioBtn,
    filterByName,
    filterByFirstchar,
    filterByIngredient,
  } = state;

  if (path.match('comidas')) (alter = 'meals');
  if (path.match('bebidas')) (alter = 'drinks');
  if (filterByIngredient
    || filterByName
    || filterByFirstchar) {
    switch (radioBtn) {
    case radio.ingredient:
      arr = filterByIngredient[alter];
      return arr;
    case radio.byName:
      arr = filterByName[alter];
      return arr;
    case radio.firstChar:
      arr = filterByFirstchar;
      return arr;
    default:
      if (path.match('comidas')) (arr = state.data.food);
      if (path.match('bebidas')) (arr = state.data.beverage);
      return arr;
    }
  }
}

export default function SearchRecipes() {
  const { HandleTextChange, HandleRadioBtnChange, state, setState } = useContext(context);
  const [setGetEvent] = useSendRequestBtn();
  const location = useLocation();
  const { pathname } = location;

  const buttonFetch = () => (
    <div className="radio-btn">
      <Button
        data-testid="exec-search-btn"
        variant="contained"
        color="primary"
        onClick={ () => setGetEvent(Math.random()) }
      >
        Buscar
      </Button>
    </div>
  );

  const array = filterSelection(pathname, state);

  useEffect(() => {
    if (pathname.match('comidas')) {
      setState((s) => ({
        ...s,
        data: {
          ...s.data,
          food: array,
        },
      }));
    }
    if (pathname.match('bebidas')) {
      setState((s) => ({
        ...s,
        data: {
          ...s.data,
          beverage: array,
        },
      }));
    }
  }, [array, setState]);

  return (
    <div className="search-recipes">
      {inputSearchBar(HandleTextChange)}
      {radioButtons(HandleRadioBtnChange)}
      {buttonFetch()}
    </div>
  );
}
