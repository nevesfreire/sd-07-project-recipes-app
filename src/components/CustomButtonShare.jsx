import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default class CustomButtonShare extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      isShared: false,
    };
  }

  handleButtonClick() {
    const { url } = this.props;
    copy(`http://localhost:3000${url}`);
    this.setState({ isShared: true });
  }

  render() {
    const { isShared } = this.state;
    return (
      <div>
        { (isShared) && <p>Link copiado!</p> }
        <button type="button" data-testid="share-btn" onClick={ this.handleButtonClick }>
          <img src={ shareIcon } alt="" />
        </button>
      </div>
    );
  }
}

CustomButtonShare.propTypes = {
  url: PropTypes.string.isRequired,
};
