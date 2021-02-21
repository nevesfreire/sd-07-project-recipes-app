/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function RenderFoodCard(array, tillTwelve) {
  if (!array) {
    console.log('estou no card', array);
    return (
      <div className="loading">
        loading...
      </div>
    );
  }
  return (
    <div className="card-container">
      {
        array.filter((_meals, index) => index < tillTwelve)
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="image-card"
              key={ idMeal }
            >
              <Card>
                <Link to={ { pathname: `/comidas/${idMeal}` } }>
                  <div className="image-food">
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ strMealThumb }
                      alt="food"
                    />
                  </div>
                </Link>
                <CardContent>
                  <Typography
                    data-testid={ `${index}-card-name` }
                    variant="body2"
                    color="initial"
                    component="p"
                  >
                    {strMeal}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))
      }
    </div>
  );
}

export default RenderFoodCard;
