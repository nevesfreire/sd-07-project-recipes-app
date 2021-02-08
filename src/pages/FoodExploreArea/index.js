import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FoodContext } from '../../providers/AllProviders';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const FoodExploreArea = () => {
  const maxLength = 12;
  const { data } = useContext(FoodContext);
  const [dataFiltered, setDataFiltered] = useState(data.filter((_, i) => i < maxLength));
  const areaOptions = [
    'American', 'British', 'Canadian', 'Chinese', 'Dutch', 'Egyptian', 'French', 'Greek',
    'Indian', 'Irish', 'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian',
    'Mexican', 'Moroccan', 'Polish', 'Russian', 'Spanish', 'Thai', 'Tunisian',
    'Turkish', 'Unknown', 'Vietnamese',
  ];

  useEffect(() => {
    setDataFiltered(data.filter((_, i) => i < maxLength));
  }, [data]);

  const fetchArea = useCallback(async (query) => {
    const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
    const { meals } = await endpoint.json();
    return meals;
  }, []);

  const handleChange = async ({ target: { value } }) => {
    if (value === 'All') return setDataFiltered(data.filter((_, i) => i < maxLength));
    const cards = await fetchArea(value);
    setDataFiltered(cards.filter((_, i) => i < maxLength));
  };

  return (
    <div>
      <Header handleChange={ handleChange } areaOptions={ areaOptions }>
        Explorar Origem
      </Header>
      <div className="all-cards">
        { dataFiltered.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <div key={ strMeal } data-testid={ `${index}-recipe-card` } className="srch-card">
            <Link to={ `/comidas/${idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ `${strMeal} Thumb` }
                width="100"
              />
              <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FoodExploreArea;
