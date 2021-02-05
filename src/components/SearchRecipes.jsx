import React, { useContext } from 'react';
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

const inputSearchBar = (onChange) => (
  <div className="input-searchbar">
    <Input
      data-testid="search-input"
      type="text"
      name="search"
      placeholder="sua busca aqui"
      onChange={ (e) => onChange(e) }
    />
  </div>
);

const radioButtons = (handleChange, value) => (
  <div className="radio-controll">
    <FormControl component="fieldset" className="">
      <FormLabel component="legend">Receitas</FormLabel>
      <RadioGroup
        aria-label="option"
        name="Receitas"
        value={ value }
        onChange={ handleChange }
      >
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
      </RadioGroup>
    </FormControl>
  </div>
);

const buttonFetch = (onClick) => (
  <div className="input-radiobutton">
    <Button
      data-testid="exec-search-btn"
      variant="contained"
      collor="primary"
      onClick={ (e) => onClick(e) }
      className=""
    >
      Buscar
    </Button>
  </div>
);

export default function SearchRecipes() {
  const { state, setState } = useContext(context);

  const searchChanges = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const changeHandler = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setState({ ...state, [target.name]: value });
  };

  const execFetch = () => {
    console.log('oi');
  };

  return (
    <div className="search-recipes">
      {inputSearchBar(searchChanges)}
      {radioButtons(changeHandler)}
      {buttonFetch(execFetch)}
    </div>
  );
}
