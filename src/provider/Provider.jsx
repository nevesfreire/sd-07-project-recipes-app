import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../contextApi/context';
import LoginOk from '../helpers/EmailOk';
import foodApi from '../services/foodApi';
import drinkApi from '../services/drinksApi';

function Provider({ children }) {
  const initial = false;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState({ credentials: [] });
  const [search, setSearch] = useState(initial);

  const [data, setData] = useState(
    {
      food: [],
      radioBtn: '',
      beverage: [],
      textSeach: '',
      filterByName: [],
      filterByFirstchar: [],
      filterByIngredient: [],
    },
  );
  const { radioBtn } = data;

  function HandleTextChange(event) {
    const { value } = event.target;

    console.log(event.target);
    if (radioBtn === 'firstChar' && value.length > 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
      // setSearch({ change: false });
    }
    setData(
      { ...data, textSeach: value },
    );
  }

  function HandleRadioBtnChange(event) {
    const { value } = event.target;
    setData(
      { ...data, radioBtn: value },
    );
  }

  useEffect(() => {
    if (email && password) {
      LoginOk(email, password, setDisabled);
    }
  }, [password]);

  useEffect(() => {
    const getFood = async () => {
      const { meals } = await foodApi();
      const { drinks } = await drinkApi();
      setData(
        { ...data,
          food: { ...data.food, meals },
          beverage: { ...data.beverage, drinks } },
      );
    };
    getFood();
  }, []);

  const changeClick = ((change) => setSearch({ change }));

  const context = {
    ...search,
    setEmail,
    setPassword,
    setDisabled,
    setState,
    setSearch,
    changeClick,
    setData,
    HandleRadioBtnChange,
    HandleTextChange,

    data,
    search,
    state,
    email,
    password,
    disabled,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
