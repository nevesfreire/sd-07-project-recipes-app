import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../images/whiteHeartIcon.svg';
import image2 from '../../images/blackHeartIcon.svg';
import image3 from '../../images/drinkIcon.svg';
import './style.css';

function Carousel() {
  const images = (image) => {
    const alt = 'alt';
    return (
      <div className="col-xs-4 disp">
        <img src={ image } className="d-block w-50" alt={ alt } />
        <img src={ image } className="d-block w-50" alt={ alt } />
      </div>
    );
  };

  return (
    <div className="container">
      {/* <div className="row"> */}
      {/* <div className="col-xs-12"> */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" />
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            { images(image1) }
          </div>
          <div className="carousel-item">
            { images(image2) }
          </div>
          <div className="carousel-item">
            { images(image3) }
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >

          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Carousel;
