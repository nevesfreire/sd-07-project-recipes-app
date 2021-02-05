import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export default function ButtonConstructor(
  { testid, icon, func, text, id, classBootstrap, position },
) {
  return (
    <Button
      variant={ classBootstrap || 'outline-primary' }
      className={ position }
      id={ id }
      data-testid={ testid }
      onClick={ func }
    >
      {!!text && text}
      {!!icon && <img src={ icon } alt="icone" />}
    </Button>
  );
}

ButtonConstructor.defaultProps = {
  classBootstrap: '',
  position: '',
  text: '',
  id: '',
  icon: '',
  func: () => {},
  testid: '',
};

ButtonConstructor.propTypes = {
  classBootstrap: PropTypes.string,
  position: PropTypes.string,
  testid: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  func: PropTypes.func,
};
