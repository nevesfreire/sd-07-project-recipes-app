import React, { useContext } from 'react';
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
import context from '../contextAPI/context';

const inputSearchBar = (MyOnChange) => (
  <div className="input-searchbar">
    <Input
      data-testid="search-input"
      type="text"
      name="search"
      placeholder="sua busca aqui"
      onChange={ (e) => MyOnChange(e) }
    />
  </div>
);

const radioButtons = (MyOnChange, value) => (
  <div className="radio-controll">
    <FormControl component="fieldset">
      <FormLabel component="legend">Receitas</FormLabel>
      <RadioGroup
        aria-label="option"
        name="Receitas"
        value={ value }
        onChange={ MyOnChange }
      >
        <div className="field-set">
          <FormControlLabel
            data-testid="ingredient-search-radio"
            value="ingredient"
            control={ <Radio /> }
            label="Ingrediente"
          />
          <FormControlLabel
            data-testid="name-search-radio"
            value="name"
            control={ <Radio /> }
            label="Nome"
          />
          <FormControlLabel
            data-testid="first-letter-search-radio"
            value="letter"
            control={ <Radio /> }
            label="1ª Letra"
          />
        </div>
      </RadioGroup>
    </FormControl>
  </div>
);

const buttonFetch = () => (
  <div className="radio-btn">
    <Button
      data-testid="exec-search-btn"
      variant="contained"
      color="primary"
      onClick={ () => console.log('clicou') }
    >
      Buscar
    </Button>
  </div>
);

export default function SearchRecipes() {
  const { setState } = useContext(context);
  const location = useLocation();
  const { pathname } = location;

  const search = ({ target: { name, value } }) => {
    console.log(name, ':', value);
    setState((s) => ({
      ...s,
      pathname,
      filtered: value,
    }));
  };

  const changeHandler = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target.name, ':', value);
    setState((s) => ({
      ...s,
      pathname,
      filter: value,
    }));
  };

  return (
    <div className="search-recipes">
      {inputSearchBar(search)}
      {radioButtons(changeHandler)}
      {buttonFetch()}
    </div>
  );
}
