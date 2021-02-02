import React, { useContext } from 'react';
import Buttons from '../buttons';
import GlobalContext from '../../context/GlobalContext';
import Styles from './Styles';

const { BtnBar } = Styles;

export default function DrinkCategories() {
  const {
    data,
  } = useContext(GlobalContext);

  const listOfCategories = () => {
    const list = [];
    data.forEach(({ strCategory }) => {
      list.push(strCategory);
    });
    return list;
  };

  return (
    <BtnBar>
      {Buttons(listOfCategories())}
    </BtnBar>
  );
}
