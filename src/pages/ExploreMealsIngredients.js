import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';

function ExploreMealsIngredients() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Ingredientes'));
  }, [dispatch]);


  https://www.themealdb.com/api/json/v1/1/list.php?i=list
  const index = 0;
  return (
    <div>
      <Header />
      <Link to={ `/comidas` }>
          <div
            data-testid={ `${index}-ingredient-card` }
            // key={ `card-${index}` }
            // className="card" style="width: 18rem;"
          >
            <img
              // className="card-img-top"
              // key={ `meal-thumb-${index}` }
              src=""
              alt="ingredient thumb"
              data-testid={ `${index}-card-img` }
            />
            <div key={ `card-body-${index}` }>
              <h2
                // className="card-title"
                // key={ ingredient.strMeal }
                data-testid={ `${index}-card-name` }
              >
                Ingrediente
              </h2>
            </div>
          </div>
        </Link>
      <Footer />
    </div>
  );
}

export default ExploreMealsIngredients;
