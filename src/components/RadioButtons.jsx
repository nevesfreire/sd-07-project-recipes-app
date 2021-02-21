import React, { useContext } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import context from '../contextApi/context';

function RadioButtons() {
  const { search, HandleRadioBtnChange } = useContext(context);
  const { change } = search;
  return change ? (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Gender</FormLabel> */}
      <RadioGroup>
        <div className="radio-group-controll" onChange={ HandleRadioBtnChange }>
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
  ) : null;
}

export default RadioButtons;
