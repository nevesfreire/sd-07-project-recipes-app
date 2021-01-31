import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [isMeal, setIsMeal] = useState(false);
  const [details, setDetails] = useState({});

  const context = {
    data,
    filters,
    activeFilter,
    details,
    isMeal,
    setData,
    setFilters,
    setIsMeal,
    setActiveFilter,
    setDetails,
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
