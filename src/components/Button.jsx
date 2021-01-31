import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ testid, icon, func, text, id, classBootstrap }) {
  return (
    <button
      type="button"
      id={ id }
      className={ classBootstrap || 'btn btn-outline-primary' }
      data-testid={ testid }
      onClick={ func }
    >
      {!!text && text}
      {!!icon && <img src={ icon } alt="icone" />}
    </button>
  );
}

Button.defaultProps = {
  classBootstrap: '',
  text: '',
  id: '',
  icon: '',
  func: () => {},
  testid: '',
};

Button.propTypes = {
  classBootstrap: PropTypes.string,
  testid: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  func: PropTypes.func,
};
