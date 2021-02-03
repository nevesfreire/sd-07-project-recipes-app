import React from 'react';
// import GlobalContext from '../context/GlobalContext';

export default function CategoriesButtons() {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={ () => redirect(`/explorar/${renderButtonExplore}/ingredientes`) }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        //   onClick={ () => redirect('/explorar/comidas/area') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={ () => redirect(`/${renderButtonExplore}/${idRandom}`) }
      >
        Drinks
      </button>
    </div>
  );
}
