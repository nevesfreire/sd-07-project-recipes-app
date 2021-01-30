import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function ExploreButtons() {
  const { renderButtonExplore, redirect, callRandomRecipe, idRandom } = useContext(GlobalContext);

  useEffect(() => {
    callRandomRecipe();
  }, [callRandomRecipe]);

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
        onClick={ () => redirect(`/${renderButtonExplore}/${idRandom}`) }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}
