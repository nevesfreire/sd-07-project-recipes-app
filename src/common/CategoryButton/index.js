import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';


function CategoryButton({ categoryName, categoryType }) {
  const { filterByCategory } = useContext(AppContext);
  return(
    <button
      data-testid={`${categoryName}-category-filter`}
      name={categoryName}
      onClick={filterByCategory}
      categorytype={categoryType}
    >
      {categoryName}
    </button>
  )
}

export default CategoryButton;