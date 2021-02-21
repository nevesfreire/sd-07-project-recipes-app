import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function renderdrinkCard(array, tillTwelve) {
  if (!array) {
    return (
      <div className="loading">
        loading...
      </div>
    );
  }
  return (
    <div className="card-container">
      {array
        .filter((_drink, index) => index < tillTwelve)
        .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="image-card"
            key={ idDrink }
          >
            <Card>
              <Link to={ { pathname: `/bebidas/${idDrink}` } }>
                <div className="image-food">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt="drink"
                  />
                </div>
              </Link>
              <CardContent>
                <Typography variant="body2" color="initial" component="p">
                  <span data-testid={ `${index}-card-name` }>
                    {strDrink}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default renderdrinkCard;
