import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import context from '../../context';
import { Footer, Header } from '../../components';
import RequestData from '../../services/RequestAPI';
import './style.css';

function ExploreBy() {
  // const { location } = props;
  const history = useHistory();
  const { pathname } = history.location;
  // console.log(history.location)
  const { setDetails } = useContext(context);

  const handleClick = async () => {
    const newPathname = pathname.replace('/explorar/', '/');

    async function fetchData() {
      const recipeType = (newPathname === '/comidas') ? 'meal' : 'cocktail';
      const URL_FILTERS = `https://www.the${recipeType}db.com/api/json/v1/1/random.php`;
      const dataDetail = await RequestData(URL_FILTERS);
      let id = '';
      if (newPathname === '/comidas') {
        await setDetails(dataDetail.meals);
        const { idMeal } = await dataDetail.meals[0];
        id = idMeal;
      } else {
        await setDetails(dataDetail.drinks);
        const { idDrink } = await dataDetail.drinks[0];
        id = idDrink;
      }
      return (id);
    }

    const idDetails = await fetchData();
    history.push(`${newPathname}/${idDetails}`);
  };

  return (
    <div>
      <Header />
      <div className="explore-container">
        <Link className="explore-content" to={ `${pathname}/ingredientes` }>
          <button
            className="explore-button"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        {
          (pathname === '/explorar/comidas')
          && (
            <Link className="explore-content" to="/explorar/comidas/area">
              <button
                className="explore-button"
                type="button"
                data-testid="explore-by-area"
              >
                Por Local de Origem
              </button>
            </Link>
          )
        }
        <div className="explore-content">
          <button
            className="explore-button"
            type="button"
            data-testid="explore-surprise"
            onClick={ handleClick }
            onKeyPress={ handleClick }
          >
            Me Surpreenda!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreBy;
