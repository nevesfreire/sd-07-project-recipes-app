import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Context } from '../../context/Provider';
import fetchApi from '../../services/api';

function Categories({ category, setCategory }) {
  const { api } = useContext(Context);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [slicedResults, setSlicedResults] = useState([]);
  useEffect(() => {
    if (api === '') return;
    const firstFetch = async () => {
      setIsFetching(true);
      const data = await fetchApi(undefined, 'categoriesList', api);
      if (!data) return;
      setCategoriesData(data);
    };
    firstFetch();
  }, [api]);

  useEffect(() => {
    if (!isFetching) return;
    const initial = 0;
    const end = 5;
    if (categoriesData.length > initial) {
      setSlicedResults(categoriesData.slice(initial, end));
      setIsFetching(false);
    }
  }, [isFetching, categoriesData]);

  const handleClick = ({ target: { name } }) => {
    if (name === category) {
      setCategory('all');
    } else {
      setCategory(name);
    }
  };

  return (
    <div>
      <nav>
        <Button
          type="button"
          data-testid="All-category-filter"
          name="all"
          onClick={ handleClick }
        >
          All
        </Button>
        {slicedResults.map(({ strCategory }) => (
          <Button
            type="button"
            key={ strCategory }
            name={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {strCategory}
          </Button>
        ))}
      </nav>
    </div>
  );
}

Categories.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default Categories;
