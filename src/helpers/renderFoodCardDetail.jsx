import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function RenderFoodCardDetail(array, idFood) {
  if (!array) {
    return (
      <div className="loading">
        loading...
      </div>
    );
  }
  return (
    <div className="card-container">
      {
        array.filter(({ idMeal }) => idMeal === idFood)
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="image-card"
              key={ idMeal }
            >
              <Card>
                <div className="image-food">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="food"
                  />
                </div>
                <div className="subtitle-controller">
                  <CardContent>
                    <Typography
                      data-testid={ `${index}-card-name` }
                      variant="body2"
                      color="initial"
                      component="p"
                    >
                      { strMeal }
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))
      }
    </div>
  );
}

export default RenderFoodCardDetail;
