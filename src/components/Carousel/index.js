import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import image1 from '../../images/whiteHeartIcon.svg';
// import image2 from '../../images/blackHeartIcon.svg';
// import image3 from '../../images/drinkIcon.svg';
import './style.css';

function Carousel() {
  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  return (
    <div className="teste">
      <h2>Our Certifications</h2>
      <div className="row mx-auto my-auto">
        <div id="recipeCarousel" className="carousel slide w-100" data-ride="carousel">
          <div className="carousel-inner w-100" role="listbox">
            <div className="carousel-item active">
              <img width="900" height="1200" className="d-block col-4 img-fluid" src="https://cdn.shopify.com/s/files/1/2304/9095/files/NMSDC.png?10873" />
            </div>
            <div className="carousel-item">
              <img className="d-block col-4 img-fluid" src="https://cdn.shopify.com/s/files/1/2304/9095/files/DBE-ACDBE-logo.png?10873" />
            </div>
            <div className="carousel-item">
              <img className="d-block col-4 img-fluid" src="https://cdn.shopify.com/s/files/1/2304/9095/files/MBE_LOGO.png?10873" />
            </div>
            <div className="carousel-item">
              <img className="d-block col-4 img-fluid" src="https://cdn.shopify.com/s/files/1/2304/9095/files/2018_WBENC_logo_text_gray.png?10873" />
            </div>
            <div className="carousel-item">
              <img className="d-block col-4 img-fluid" src="http://novel-mg.com/assets/cert_logo.png" />
            </div>
            <div className="carousel-item">
              <img className="d-block col-4 img-fluid" src="https://www.kriaanet.com/wp-content/uploads/2019/02/300ppi-feat-logo_feat_logo-EDWOSB.png" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#recipeCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#recipeCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>

  // </div>
  );
}

// render(<ControlledCarousel />);

// function CarouselComponent() {
//   return (
//     <div className="teste">
//       <div className="teste1">
//         <div className="teste11">
//           aaa
//         </div>
//         <div className="teste12">
//           111
//         </div>
//       </div>
//       <div className="teste2">
//         bbb
//       </div>
//       <div className="teste2">
//         ccc
//       </div>
//     </div>
//   );
// }

export default Carousel;
