import React from 'react';
import Styles from './Styles';

const { Btn } = Styles;

export default function Buttons(number, info) {
  const listOfButtons = [];
  const zero = 0;
  for (let index = zero; index < number; index += 1) {
    if (info[index] !== undefined) {
      listOfButtons.push(
        <Btn
          data-testid={ `${info[index]}-category-filter` }
          key={ `${info[index]}-category-filter` }
        >
          {info[index]}
        </Btn>,
      );
    }
  }
  return listOfButtons;
}
