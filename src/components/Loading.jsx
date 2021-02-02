import React from 'react';
import { Spinner } from 'react-bootstrap';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <Spinner animation="border" size="xl" variant="success">
          <span>Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default Loading;
