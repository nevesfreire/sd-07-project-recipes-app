// import React, { useContext, useEffect } from 'react';
// import { useFetch } from '../hooks/useFetch';
// import GlobalContext from '../context/GlobalContext';

// criar data/detailRecipes.js ok
// const detailRecipes = {
//   id: '',
//   drinkDetails: [],
//   detailsRecipe: []
// }

// importar detailsRecipe em /data/index - pendente (ver com Bruno)

// GlobalProvider - pendente ver estrutura das desestruturações com Bruno
// inserir novas funções em GlobalProvader
// setDrinkDetails: (value) => updateState('drinkDetails', value)
// setDetailsRecipe: (value) => updateState('detailsRecipe', value)

// export default function FoodDetails() {
//   const context = useContext(GlobalContext);
// desestruturar context
// com id-da-receita,
// e as fns que vão manipular o estado global de drinkDetails e detailsRecipe
// inserir a const com id-da-receita dentros dos endpoints
// const endpointFood = `https://www.themealdb.com/api/json/v1/1/lookup.php?i={$id-da-receita}`
// const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={$id-da-receita}`;
// const responseFood = useFetch(endpointFood);
// const responseDrink = useFetch(endpointDrink);

// useEffect(() => {
//   setDrinkDetails(responseDrink);
// }, [responseDrink]);

// useEffect(() => {
//   setDetailsRecipe(responseFood);
// }, [responseFood]);

//   return (
//     <div>
//       <div>
//         <img
//           src="imagem da receita"
//           alt="imagem da receita"
//           data-testid="recipe-photo"
//         />
//       </div>
//       <div>
//         <h1 data-testid="recipe-title">Titulo dinâmico da receita</h1>
//         <button type="button" data-testid="share-btn">
//           importar o icone de compartilhar
//         </button>
//         <button type="button" data-testid="favorite-btn">
//           importar o icone de favoritar
//         </button>
//       </div>
//       <div>
//         <h3>informação de categoria deve ser dinâmica</h3>
//       </div>
//       <ul>
//         Ingredients
//         {/* data-testid={ `${index}-ingredient-name-and-measure` } */}
//         <li>
//           valor de retorno da fn
//         </li>
//         <li>
//           valor de retorno da fn
//         </li>
//         <li>
//           valor de retorno da fn
//         </li>
//         <li>
//           valor de retorno da fn
//         </li>
//         <li>
//           valor de retorno da fn
//         </li>
//       </ul>
//       <div>
//         <h3>Instructions</h3>
//         <p>Lorem</p>
//       </div>
//       <div>
//         {/* https://www.devmedia.com.br/html5-as-tags-audio-e-video/26018 */}
//         {/* https://dequeuniversity.com/rules/axe/3.3/video-caption */}
//         <video width="320" height="240" controls="controls">
//           <source src="filme.mp4" type="video/mp4" data-testid="video" />
//           <track
//             src="captions_en.vtt"
//             kind="captions"
//             // srclang="en"
//             label="english_captions"
//           />
//           seu navegador não suporta HTML5.
//         </video>
//       </div>
//       <div>
//         <h3>Recomendadas</h3>
//         <div>
//           <img src="" alt="" />
//           <h5>category dinâmico</h5>
//           <p>Nome da receita dinâmico</p>
//         </div>
//         <div>
//           <img src="" alt="" />
//           <h5>category dinâmico</h5>
//           <p>Nome da receita dinâmico</p>
//         </div>
//       </div>
//       <div>
//         <button type="button" data-testid="start-recipe-btn">
//           Iniciar Receita
//         </button>
//       </div>
//     </div>
//   );
// }
