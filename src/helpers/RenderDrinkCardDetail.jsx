import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function RenderdrinkCardDetail(array, drinkId) {
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
        array.filter(({ idDrink }) => idDrink === drinkId)
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="image-card"
              key={ idDrink }
            >
              <Card>
                <div className="image-food">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt="food"
                  />
                </div>
                <CardContent>
                  <Typography
                    data-testid={ `${index}-card-name` }
                    variant="body2"
                    color="initial"
                    component="p"
                  >
                    {strDrink}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))
      }
    </div>
  );
}

export default RenderdrinkCardDetail;
