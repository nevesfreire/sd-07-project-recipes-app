import React from 'react';
import Styles from './Styles';

const { Btn } = Styles;
const totalOfCategories = 5;

export default function Buttons(category) {
  console.log(category);
  const removeDuplicates = [...new Set(category)];
  const listOfButtons = [];
  removeDuplicates.forEach((each, index) => {
    if (each !== undefined && index < totalOfCategories) {
      listOfButtons.push(
        <Btn
          data-testid={ `${each}-category-filter` }
          key={ `${index}-category-filter` }
        >
          {each}
        </Btn>,
      );
    }
  });
  return listOfButtons;
}
