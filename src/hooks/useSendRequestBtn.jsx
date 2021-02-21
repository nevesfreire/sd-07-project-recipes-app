import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import searchItemResidual from '../services/searchItemResidual';
import paramArray from '../data/helperParam';
import context from '../contextApi/context';
import getPath from '../helpers/getPath';

function useSendRequestBtn() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const randonNumber = 0;
  const [getEvent, setGetEvent] = useState(randonNumber);
  const { data, setData } = useContext(context);
  const { radioBtn, textSeach } = data;

  const { radio, filter, typeOf } = paramArray;

  const myPath = getPath(pathname);

  useEffect(() => {
    async function fetchData() {
      if (radioBtn === radio.ingredient) {
        const item = await searchItemResidual(
          textSeach,
          myPath,
          filter.ingredient,
          typeOf.ingredientType,
        );
        setData({ ...data, filterByIngredient: item });
      }

      if (radioBtn === radio.byName) {
        const item = await searchItemResidual(
          textSeach,
          myPath,
          filter.byNameOrFistChar,
          typeOf.nameType,
        );
        setData({ ...data, filterByName: item });
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
          setData({ ...data, filterByFirstchar: meals });
        }

        if (myPath === 'cocktail') {
          const { drinks } = item;
          setData({ ...data, filterByFirstchar: drinks });
        }
      }
    }
    fetchData();
  }, [getEvent]);

  return [setGetEvent];
}

export default useSendRequestBtn;
