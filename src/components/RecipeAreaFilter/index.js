import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FILTER_TYPES } from '../../services/recipeAPI';
import { fetchAreas } from '../../store/ducks/areas';
import { setFilter } from '../../store/ducks/recipes';

import StyledDropdown from './styles';

export default function RecipeAreaFilter() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');
  const { data: areas, isFetching } = useSelector((state) => state.areas);

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  useEffect(() => {
    if (selectedValue !== '') {
      dispatch(setFilter('explore', FILTER_TYPES.AREA, selectedValue));
    } else {
      dispatch(setFilter('explore', FILTER_TYPES.NAME, ''));
    }
  }, [dispatch, selectedValue]);

  return (
    <div>
      {isFetching ? 'Loading...' : ''}
      <StyledDropdown
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target: { value } }) => setSelectedValue(value) }
      >
        <option value="" data-testid="All-option">All</option>
        {areas.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            {strArea}
          </option>))}
      </StyledDropdown>
    </div>
  );
}
