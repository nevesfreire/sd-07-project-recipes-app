import React from 'react';
import { Spinner } from 'react-bootstrap';

class Loading extends React.Component {
  render() {
    return (
      <div style={ { height: '90vh', textAlign: 'center' } }>
        <Spinner animation="border" size="xl" variant="success" style={ { margin: '220px' } }>
          <p style={ { marginLeft: '60px' } }>Loading...</p>
        </Spinner>
      </div>
    );
  }
}

export default Loading;
