import React from 'react';
import Card from 'react-bootstrap/Card';

class CardC extends React.Component {
  render() {
    // const { title, img } = this.props.card;

    return (
      <Card>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>teg de para titulo aqui</Card.Title>
          <Card.Text>Some quick example text to build on the card</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CardC;
