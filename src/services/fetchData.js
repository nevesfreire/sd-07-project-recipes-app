import searchItemResidual from './searchItemResidual';
import paramArray from '../data/helperParam';

async function fetchData(myPath, filterData, setFilterData) {
  const { radioBtn, textSeach } = filterData;

  const { radio, filter, typeOf } = paramArray;

  if (radioBtn === radio.ingredient) {
    const item = await searchItemResidual(
      textSeach,
      myPath,
      filter.ingredient,
      typeOf.ingredientType,
    );

    if (myPath === 'meal') {
      const { meals } = item;
      setFilterData({ ...filterData, filterByIngredient: meals });
    }

    if (myPath === 'cocktail') {
      const { drinks } = item;
      setFilterData({ ...filterData, filterByIngredient: drinks });
    }
  }

  if (radioBtn === radio.byName) {
    console.log('entrei nome');
    const item = await searchItemResidual(
      textSeach,
      myPath,
      filter.byNameOrFistChar,
      typeOf.nameType,
    );

    if (myPath === 'meal') {
      const { meals } = item;
      setFilterData({ ...filterData, filterByName: meals });
    }

    if (myPath === 'cocktail') {
      const { drinks } = item;
      setFilterData({ ...filterData, filterByName: drinks });
    }
  }

  if (radioBtn === radio.firstChar) {
    const item = await searchItemResidual(
      textSeach,
      myPath,
      filter.byNameOrFistChar,
      typeOf.firstCharType,
    );

    if (myPath === 'meal') {
      const { meals } = item;
      setFilterData({ ...filterData, filterByFirstchar: meals });
    }

    if (myPath === 'cocktail') {
      const { drinks } = item;
      setFilterData({ ...filterData, filterByFirstchar: drinks });
    }
  }
}

export default fetchData;
