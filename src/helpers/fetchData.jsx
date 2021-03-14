import paramArray from '../data/helperParam';
import searchItemResidual from '../services/searchItemResidual';

async function fetchData(state, setState, myPath) {
  const { radioBtn, textSeach } = state;
  const { radio, filter, typeOf } = paramArray;

  if (radioBtn === radio.ingredient) {
    const item = await searchItemResidual(
      textSeach,
      myPath,
      filter.ingredient,
      typeOf.ingredientType,
    );
    setState({ ...state, filterByIngredient: item });
  }

  if (radioBtn === radio.byName) {
    console.log('entrei nome');
    const item = await searchItemResidual(
      textSeach,
      myPath,
      filter.byNameOrFistChar,
      typeOf.nameType,
    );
    setState({ ...state, filterByName: item });
  }

  if (radioBtn === radio.firstChar) {
    console.log('entrei first word');
    if (textSeach.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const item = await searchItemResidual(
      textSeach,
      myPath,
      filter.byNameOrFistChar,
      typeOf.firstCharType,
    );

    if (myPath === 'meal') {
      const { meals } = item;
      setState({ ...state, filterByFirstchar: meals });
    }

    if (myPath === 'cocktail') {
      const { drinks } = item;
      setState({ ...state, filterByFirstchar: drinks });
    }
  }
}

export default fetchData;
