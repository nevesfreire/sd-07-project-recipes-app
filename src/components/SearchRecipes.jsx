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
import useSendRequestBtn from '../hooks/useSendRequestBtn';

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

const buttonFetch = (setGetEvent) => (
  <div className="radio-btn">
    <Button
      data-testid="exec-search-btn"
      variant="contained"
      color="primary"
      onClick={ () => setGetEvent(Math.radom()) }
    >
      Buscar
    </Button>
  </div>
);

export default function SearchRecipes() {
  // const { HandleTextChange, HandleRadioBtnChange } = useContext(context);
  const [setGetEvent] = useSendRequestBtn();

  // const searchChanges = ({ target: { name, value } }) => {
  //   console.log(name, ':', value);
  //   // setState({ ...state, [name]: value });
  // };

  const changeHandler = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target.name, ':', value);
    // setState({ ...state, [target.name]: value });
  };

  return (
    <div className="search-recipes">
      {inputSearchBar(changeHandler)}
      {radioButtons(changeHandler)}
      {buttonFetch(setGetEvent)}
    </div>
  );
}
