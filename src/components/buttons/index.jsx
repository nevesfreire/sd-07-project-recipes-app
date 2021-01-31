import React from 'react';
import './Styles.css';

export default function Buttons(number, info) {
  const listOfButtons = [];
  const zero = 0;
  for (let index = zero; index < number; index += 1) {
    if (info[index] !== undefined) {
      listOfButtons.push(
        <button
<<<<<<< HEAD
          className="get-btn"
          type="button"
=======
          type="button"
          className="get-btn"
>>>>>>> f8e85995fd53af4499bbc035c0595f3e72f4a622
          data-testid={ `${info[index]}-category-filter` }
          key={ `${info[index]}-category-filter` }
        >
          {info[index]}
        </button>,
      );
    }
  }
  return listOfButtons;
}
