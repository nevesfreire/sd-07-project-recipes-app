import React, { useEffect, useContext, useState } from 'react';
import Slider from 'react-slick';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecomendationDrinkCard() {
  const { detailsRecipe, recomendations } = useContext(RecipeContext);
  const { recipeRecomendationsAPI } = useFetch();
  const [loadingRecomendation, setLoadingRecomendation] = useState(true);
  const type = Object.keys(detailsRecipe)[0];
  console.log('recomendations', recomendations.drinks);
  // const recomendationsItens = Object.values(recomendations)[0];

  useEffect(() => {
    recipeRecomendationsAPI(type)
      .then(() => setLoadingRecomendation(false));
  }, []);

  if (loadingRecomendation) {
    return (<div>Loading...</div>);
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
  };

  return (
    <div>
      <Slider { ...settings }>
        {recomendations.map((recomendation, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <div data-testid={ `${index}-recomendation-title` }>
              { recomendation.strMeal }
              <img
                className="datailsImage"
                alt={ recomendation.strMeal }
                src={ recomendation.strMealThumb }
                data-testid="recipe-photo"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecomendationDrinkCard;
