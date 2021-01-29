import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default class CustomButtonShare extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const { url } = this.props;
    copy(`http://localhost:3000${url}`);
    alert('Link copiado!');
  }

  render() {
    return (
      <div>
        <button type="button" onClick={ this.handleButtonClick }>
          <img src={ shareIcon } alt="" />
        </button>
      </div>
    );
  }
}

CustomButtonShare.propTypes = {
  url: PropTypes.string.isRequired,
};
