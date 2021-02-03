import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FoodContext } from '../../providers/AllProviders';

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
      <h1>Exporar área</h1>
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option value="All" data-testid="All-option">All</option>
        {areaOptions.map((area, index) => (
          <option
            key={ `${area}-${index}` }
            value={ area }
            data-testid={ `${area}-option` }
          >
            {area}
          </option>
        ))}
      </select>
      { dataFiltered.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link to={ `/comidas/${idMeal}` } key={ strMeal }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ `${strMeal} Thumb` }
              width="100"
            />
            <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FoodExploreArea;
