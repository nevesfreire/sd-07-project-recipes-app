import React, { useContext, useEffect } from 'react';
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
import FoodDetails from './FoodDetails';
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

// function FoodDetails() {
//   let array;
//   const { radio } = radioData;

//   const { data, setState } = useContext(context);
//   const { food,
//     radioBtn,
//     filterByName,
//     filterByFirstchar,
//     filterByIngredient } = data;
//   console.log('estou em fooddetail', filterByIngredient);
//   const { meals: mealsByName } = filterByName;
//   const { meals: mealsByIngredient } = filterByIngredient;
//   const { meals } = food;
//   array = meals;

//   if (mealsByIngredient || mealsByName || filterByFirstchar) {
//     switch (radioBtn) {
//     case radio.ingredient:
//       array = mealsByIngredient;
//       break;
//     case radio.byName:
//       array = mealsByName;
//       break;
//     case radio.firstChar:
//       array = filterByFirstchar;
//       break;
//     default:
//       array = meals;
//     }
//     console.log('dentro do switch', array);
//   }
//   useEffect(() => {
//     setState((s) => ({ ...s,
//       data: {
//         food: array,
//       },
//     }));
//   }, [data, array, setState]);

//   // const { foodPath } = props;
//   // const { location: { pathname } } = foodPath;
//   // const pathString = pathname.split('/');
//   // const idFood = pathString[2];

//   // return (
//   //   <div className="card-container">
//   //     {
//   //       RenderFoodCardDetail(array, idFood)
//   //     }
//   //   </div>
//   // );
// }

export default function SearchRecipes() {
  const { HandleTextChange, HandleRadioBtnChange, state } = useContext(context);
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
  let array;
  const { radio } = radioData;

  const { setState } = useContext(context);
  const {
    radioBtn,
    filterByName,
    filterByFirstchar,
    filterByIngredient,
  } = state;
  console.log('estou em fooddetail', filterByIngredient);

  if (filterByIngredient || filterByName || filterByFirstchar) {
    switch (radioBtn) {
    case radio.ingredient:
      array = filterByIngredient.meals;
      break;
    case radio.byName:
      array = filterByName.meals;
      break;
    case radio.firstChar:
      array = filterByFirstchar.meals;
      break;
    default:
      array = state.data.food;
    }
  }

  useEffect(() => {
    setState({
      data: {
        food: array,
      },
    });
  }, [array]);

  return (
    <div className="search-recipes">
      {inputSearchBar(HandleTextChange)}
      {radioButtons(HandleRadioBtnChange)}
      {buttonFetch()}
    </div>
  );
}
