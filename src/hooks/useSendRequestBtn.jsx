import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import searchItemResidual from '../services/searchItemResidual';
import paramArray from '../data/helperParam';
import context from '../contextAPI/context';
import getPath from '../helpers/getPath';

function useSendRequestBtn() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const randonNumber = 0;
  const [getEvent, setGetEvent] = useState(randonNumber);
  const { state, setState } = useContext(context);
  const { radioBtn, textSeach } = state;

  const { radio, filter, typeOf } = paramArray;

  const myPath = getPath(pathname);

  useEffect(() => {
    async function fetchData() {
      if (radioBtn === radio.ingredient) {
        console.log('entrei ingredientes');
        const item = await searchItemResidual(
          textSeach,
          myPath,
          filter.ingredient,
          typeOf.ingredientType,
        );
        console.log('meus ingredients: ', item);
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
        console.log('meus first Char: ', item);
        setState({ ...state, filterByName: item });
      }

      if (radioBtn === radio.firstChar) {
        console.log('entrei first word');
        const item = await searchItemResidual(
          textSeach,
          myPath,
          filter.byNameOrFistChar,
          typeOf.firstCharType,
        );
        console.log('meus items: ', item);
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
    fetchData();
  }, [getEvent]);

  return [setGetEvent];
}

export default useSendRequestBtn;
