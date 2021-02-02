import React, { useEffect, useContext, useState } from 'react';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';
import '../css/Recomendation.css'


function RecomendationCard() {
  const { detailsRecipe, recomendations } = useContext(RecipeContext);
  const { recipeRecomendationsAPI } = useFetch();
  const [loadingRecomendation, setLoadingRecomendation] = useState(true);
  const type = Object.keys(detailsRecipe)[0];
  console.log('recomendations', recomendations.drinks);

 var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    recipeRecomendationsAPI(type)
    .then(() => setLoadingRecomendation(false));
  }, []);

  if (loadingRecomendation) {
    return (<div>Loading...</div>);
  }
  
  const zero = 0;
  const seis = 6;
      
  return (
      <div className="slider">
      {recomendations.drinks.slice(zero, seis).map((recomendation, index) => (
        <ul className="sliderItem" data-testid={ `${index}-recomendation-card` }> 
          <li data-testid={ `${index}-recomendation-title` } key={ index }>{recomendation.strDrink}<img src={recomendation.strDrinkThumb}/></li>
        </ul>
      ))}
    </div>
  );
}

export default RecomendationCard;
