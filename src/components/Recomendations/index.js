// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Carousel from 'react-elastic-carousel';
// import Item from './Item';
// import './styles.css';

// const breakPoints = [
//   { width: 1, itemsToShow: 2 },
//   { width: 550, itemsToShow: 2 },
//   { width: 768, itemsToShow: 2 },
//   { width: 1200, itemsToShow: 2 },
// ];

// const Recomendation = ({ title }) => {
//   const [recomendations, setRecomendations] = useState([]);
//   console.log(recomendations);
//   useEffect(() => {
//     async function handleRecomendation() {
//       if (title.includes('comidas')) {
//         const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
//         const response = await request.json();
//         return setRecomendations(response.drinks);
//       }
//       const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
//       const response = await request.json();
//       return setRecomendations(response.meals);
//     }
//     handleRecomendation();
//   }, []);
//   const SEIS = 6;
//   return (
//     <div>
//       <h2>{`Recomendations - ${title}`}</h2>
//       <div className="carousel">
//         {title.includes('comidas') ? (
//           <Carousel breakPoints={ breakPoints }>
//             {recomendations
//               .filter((_, index) => index < SEIS)
//               .map(({ strDrink, strDrinkThumb }, index) => (
//                 <Item
//                   key={ strDrink }
//                   data-testid={ `${index}-recomendation-card` }
//                 >
//                   <img src={ strDrinkThumb } alt={ strDrink } />
//                   <h2 data-testid={ `${index}-recomendation-title` }>
//                     {strDrink}
//                   </h2>
//                 </Item>
//               ))}
//           </Carousel>
//         ) : (
//           <Carousel breakPoints={ breakPoints }>
//             {recomendations
//               .filter((_, index) => index < SEIS)
//               .map(({ strMeal, strMealThumb }, index) => (
//                 <Item
//                   key={ strMeal }
//                   data-testid={ `${index}-recomendation-card` }
//                 >
//                   <img src={ strMealThumb } alt={ strMeal } />
//                   <h2 data-testid={ `${index}-recomendation-title` }>
//                     {strMeal}
//                   </h2>
//                 </Item>
//               ))}
//           </Carousel>
//         )}
//       </div>
//     </div>
//   );
// };

// Recomendation.propTypes = { title: PropTypes.string.isRequired };

// export default Recomendation;
