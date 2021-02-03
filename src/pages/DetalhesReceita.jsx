import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestApiFoodDetails } from '../services/requestFood';

function DetalhesReceitas({ match: { params: { id } } }) {
  const [foodDetails, setFoodDetails] = useState([]);

  const callMainApi = async () => {
    const apiResult = await requestApiFoodDetails(id);
    setFoodDetails(apiResult);
  };

  useEffect(() => {
    callMainApi();
  }, []);

  return (
    <div>
      oi
    </div>
  );
}

DetalhesReceitas.propTypes = { id: PropTypes.number.isRequired };

export default DetalhesReceitas;
