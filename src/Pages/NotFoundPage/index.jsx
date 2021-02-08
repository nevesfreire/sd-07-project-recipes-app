import React from 'react';
import './style.css';
import notFund from '../../images/notFund.svg';

function NotFound() {
  return (
    <div className="container">
      {/* <h1>Not Found</h1> */}
      <img src={ notFund } alt="Página não encontrada" className="notFound" />
    </div>
  );
}

export default NotFound;
