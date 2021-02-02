import React from 'react';
import PropTypes from 'prop-types';

export default function CustomDropdown({ data }) {
  return (
    <select data-testid="explore-by-area-dropdown">
      {data.map((item, index) => (
        <option
          key={ index }
          data-testid={ `${item.strArea}-option` }
        >
          { item.strArea }
        </option>
      ))}
    </select>
  );
}

CustomDropdown.propTypes = {
  data: PropTypes.func.isRequired,
};
