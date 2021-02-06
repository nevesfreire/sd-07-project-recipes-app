import React, { useContext } from 'react';
import FoodAppContext from '../context/FoodAppContext';

function Video() {
  const { detailRecipe } = useContext(FoodAppContext);
  const { meals } = detailRecipe;

  return (
    <div className="div-video">
      <h3>Video</h3>
      {meals && meals.map(({ idMeal, strYoutube }) => (
        <embed
          key={ idMeal }
          data-testid="video"
          width="341"
          height="160"
          src={ strYoutube.split('watch?v=').join('embed/') }
        />
      ))}
    </div>
  );
}

export default Video;
