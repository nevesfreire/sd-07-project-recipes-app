import React from 'react';
import { Link } from 'react-router-dom';
import '../components.css';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function CardConstructor({
  title, img, testidImg, testidCard, testidTitle, link, callback,
}) {
  return (
    <Link to={ link } onClick={ callback }>
      <Card style={ { width: '18rem' } } data-testid={ testidCard }>
        <Card.Img
          variant="top"
          src={ img }
          className="card-img-top"
          alt="foto"
          data-testid={ testidImg }
        />
        <Card.Body>
          <Card.Title data-testid={ testidTitle }>{title}</Card.Title>
        </Card.Body>
      </Card>

    </Link>
  );
}

CardConstructor.defaultProps = {
  testidImg: '',
  testidCard: '',
  testidTitle: '',
  link: '',
  callback: () => {},
};

CardConstructor.propTypes = {
  link: PropTypes.string,
  callback: PropTypes.func,
  testidImg: PropTypes.string,
  testidCard: PropTypes.string,
  testidTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
/*
<div className="card" data-testid={ testidCard }>
        <Image
          src={ img }
          className="card-img-top"
          alt="foto"
          data-testid={ testidImg }
          rounded
        />
        <div className="card-body">
          <h5 className="card-title" data-testid={ testidTitle }>{title}</h5>
        </div>
      </div>
*/
