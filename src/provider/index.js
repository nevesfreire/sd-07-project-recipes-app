import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [isMeal, setIsMeal] = useState(false);
  const [details, setDetails] = useState({});
  // const [recipesInput, setRecipesInput] = useState('');
  // const [recipesRadio, setRecipesRatio] = useState('');

  // const handleRecipesInput = (event) => {
  //   setRecipesInput(event.target.value);
  // };

  // const handleRadioChange = (event) => {
  //   setRecipesRatio(event.target.value);
  // };

  const context = {
    data,
    filters,
    activeFilter,
    details,
    isMeal,
    // recipesInput,
    // recipesRadio,
    setData,
    setFilters,
    setIsMeal,
    setActiveFilter,
    setDetails,
    // handleRecipesInput,
    // handleRadioChange,

  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
