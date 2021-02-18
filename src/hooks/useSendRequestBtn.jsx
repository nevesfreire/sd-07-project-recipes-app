import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import ingredientFilterApi from '../services/ingredientFilterApi';
import nameFilterApi from '../services/nameFilterApi';

function useSendRequestBtn() {
  const radio = {
    ingredient: 'igredient',
    byName: 'byName',
    firstChar: 'firstChar',
  };

  const history = useHistory();
  const { location: { pathname } } = history;

  console.log('estou no hook', pathname);

  const randonNumber = 0;
  const [getEvent, setGetEvent] = useState(randonNumber);

  const { data, setData } = useContext(context);

  const { radioBtn, textSeach } = data;

  let choice = '';
  if (pathname === '/bebidas') {
    choice = 'cocktail';
  }

  if (pathname === '/comidas') {
    choice = 'meal';
  }

  useEffect(() => {
    async function fetchData() {
      if (radioBtn === radio.ingredient) {
        const item = await ingredientFilterApi(textSeach, choice);
        if (!item) {
          setData({ ...data, filterByIngredient: [] });
        }
        setData({ ...data, filterByIngredient: item });
      }

      if (radioBtn === radio.byName) {
        const item = await nameFilterApi(textSeach, choice);
        setData({ ...data, filterByName: item });
      }
    }
    fetchData();
  }, [getEvent]);

  return [setGetEvent];
}

export default useSendRequestBtn;
