import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import copy from '../helper/Require';

class ShareButton extends React.Component {
  constructor() {
    super();

    this.state = {
      copied: false,
    };
  }

  render() {
    const { copied } = this.state;
    const { url } = this.props;

    return (
      <div>
        <button
          style={ { background: 'none', border: 'none' } }
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            this.setState({ copied: true });
            copy(`http://localhost:3000${url}`);
          } }
        >
          <img src={ shareIcon } alt="Share" />
        </button>
        {copied ? <span style={ { color: 'red' } }>Link copiado!</span> : null}
      </div>
    );
  }
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ShareButton;
