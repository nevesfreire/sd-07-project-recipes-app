import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/Context';
import useFetch from '../hooks/useFetch';

function Categories({ list, type }) {
  const { setSelectedCategory } = useContext(Context);
  const { selectedCategory } = useFetch();
  return (
    <div>
      {list.map((category) => (
        <button
          onClick={ () => selectedCategory(category.strCategory, type) }
          value={ category.strCategory }
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>))}
    </div>
  );
}

Categories.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Categories;
