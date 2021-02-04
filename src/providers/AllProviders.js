import React from 'react';
import PropTypes from 'prop-types';
import FoodContext from './Context/Context';
import FoodProvider from './FoodProvider';
import DrinkProvider, { DrinkContext } from './DrinkProvider';
import StorageProvider, { StorageContext } from './StorageProvider';

const AllProviders = ({ children }) => (
  <FoodProvider>
    <DrinkProvider>
      <StorageProvider>
        { children }
      </StorageProvider>
    </DrinkProvider>
  </FoodProvider>
);

export default AllProviders;

export { DrinkContext, StorageContext, FoodContext };

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
