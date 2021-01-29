import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function ExploreButtons() {
  const { renderButtonExplore, redirect } = useContext(GlobalContext);
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => redirect(`/explorar/${renderButtonExplore}/ingredientes`) }
      >
        Por Ingredientes
      </button>
      {renderButtonExplore === 'comidas' && (
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => redirect('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
      )}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => redirect(`/${renderButtonExplore}/:id`) }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}
