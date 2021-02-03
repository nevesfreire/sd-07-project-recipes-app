import React, { useEffect, useState, useCallback } from 'react';
import Styles from './Styles';

const { BtnBar, Btn } = Styles;
const cinco = 5;

export default function FoodCategories() {
  const [categories, setCategories] = useState([]);
  const fnFetchCategories = useCallback(async () => {
    const endpoint = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const response = await endpoint.json();
    const filtered = [];
    Object.entries(response).forEach((category) => {
      category[1].forEach(({ strCategory }, index) => {
        if (index < cinco) filtered.push(strCategory);
      });
    });
    console.log(filtered);
    setCategories(filtered);
  }, []);

  useEffect(() => {
    fnFetchCategories();
  }, [fnFetchCategories]);

  return (
    <BtnBar>
      {categories.map((cat, key) => (
        <Btn
          data-testid={ `${cat}-category-filter` }
          key={ `${cat}-${key}-category-filter` }
        >
          {cat}
        </Btn>))}
    </BtnBar>
  );
}
