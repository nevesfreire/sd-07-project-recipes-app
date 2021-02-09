import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <h3>This page does not exist</h3>
    <Link to="/">
      Do you want do go to Home Page?
    </Link>
  </div>
);

export default NotFound;
