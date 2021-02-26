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
// import context from '../contextAPI/context';
import useSendRequestBtn from '../hooks/useSendRequestBtn';
import context from '../contextAPI/context';

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

// const buttonFetch = (setGetEvent) => (
//   <div className="radio-btn">
//     <Button
//       data-testid="exec-search-btn"
//       variant="contained"
//       color="primary"
//       onClick={ (e) => setGetEvent(e) }
//     >
//       Buscar
//     </Button>
//   </div>
// );

export default function SearchRecipes() {
  const { HandleTextChange, HandleRadioBtnChange } = useContext(context);
  const [setGetEvent] = useSendRequestBtn();

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
  // const searchChanges = ({ target: { name, value } }) => {
  //   console.log(name, ':', value);
  //   // setState({ ...state, [name]: value });
  // };

  // const changeHandler = ({ target }) => {
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   console.log(target.name, ':', value);
  //   // setState({ ...state, [target.name]: value });
  // };

  return (
    <div className="search-recipes">
      {inputSearchBar(HandleTextChange)}
      {radioButtons(HandleRadioBtnChange)}
      {buttonFetch()}
    </div>
  );
}
