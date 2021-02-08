import React, { useEffect, useState, useCallback, useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { zero, five } from '../../services/numbers';
import './styles.css';

export default function DrinkCategories() {
  const { selectedTypeDrink } = useContext(GlobalContext);
  const [toggle, setToggle] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const newToggle = {};
    for (let index = zero; index < categories.length; index += 1) {
      newToggle[index] = false;
    }
    setToggle(newToggle);
  }, [categories.length]);

  const triggerToggle = (index) => {
    const newToggle = toggle;
    newToggle[index] = !toggle[index];
    setToggle(newToggle);
  };

  const fnFetchCategories = useCallback(async () => {
    const endpoint = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const response = await endpoint.json();
    const filtered = [];
    Object.entries(response).forEach((category) => {
      category[1].forEach(({ strCategory }, index) => {
        if (index < five) filtered.push(strCategory);
      });
    });
    filtered.push('All');
    setCategories(filtered);
  }, []);

  useEffect(() => {
    fnFetchCategories();
  }, [fnFetchCategories]);

  return (
    <div className="btn-bar">
      {categories.map((cat, index) => (
        <button
          className="btn-bar-category"
          type="button"
          data-testid={ `${cat}-category-filter` }
          key={ `${cat}-${index}-category-filter` }
          id={ `${cat}` }
          onClick={ ({ target }) => {
            triggerToggle(index);
            if (index !== five) {
              selectedTypeDrink(!toggle[index] ? 'initial' : 'categories', target.id);
            } else {
              selectedTypeDrink('initial');
            }
          } }
        >
          {cat}
        </button>))}
    </div>
  );
}
