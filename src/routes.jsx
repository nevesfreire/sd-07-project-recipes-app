import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import BebidasPage from './Pages/BebidasPage';
import ComidaPage from './Pages/ComidaPage';
=======
import DrinkPage from './Pages/DrinkPage';
>>>>>>> main-group-8
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import ExplorarPage from './Pages/ExplorarPage';
import PerfilPage from './Pages/PerfilPage';
import ComidaDetailPage from './Pages/FoodDetailPage';
import BebidaDetailPage from './Pages/DrinkDetailPage';
import ProgressComidaPage from './Pages/ProgressFoodPage';
import ProgressBebidaPage from './Pages/ProgressBebidasPage';
import ExplorarComidas from './Pages/ExploreFoodPage';
import ExplorarBebidas from './Pages/ExploreDrinkPage';
import ComidasIngredientes from './Pages/FoodIngredientsPage';
import BebidasIngredientes from './Pages/DrinksIngredientsPage';
import ComidaArea from './Pages/FoodAreaPage';
import ReceitaFeitas from './Pages/ RecipesMadePage';
import ReceitaFavorita from './Pages/RecipesFavoritesPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
<<<<<<< HEAD
      <Route exact path="/comidas" component={ ComidaPage } />
      <Route exact path="/bebidas" component={ BebidasPage } />
      {/* TODO PAGES */}
      {/*
      <Route exact path="/comidas/:id-receita" component={  } />
      <Route exact path="/bebidas/:id-receita" component={  } />
      <Route exact path="/comidas/:id-receita/in-progress" component={  } />
      <Route exact path="/bebidas/:id-receita/in-progress" component={  } />
      <Route exact path="/explorar" component={  } />
      <Route exact path="/explorar/comidas" component={  } />
      <Route exact path="/explorar/bebidas" component={  } />
      <Route exact path="/explorar/comidas/ingredientes" component={  } />
      <Route exact path="/explorar/bebidas/ingredientes" component={  } />
      <Route exact path=" /explorar/comidas/area" component={  } />
      <Route exact path="/perfil" component={  } />
      <Route exact path="/receitas-feitas" component={  } />
      <Route exact path="/receitas-favoritas" component={  } /> */}
=======
      <Route exact path="/comidas" component={ HomePage } />
      <Route exact path="/bebidas" component={ DrinkPage } />
      <Route exact path="/explorar" component={ ExplorarPage } />
      <Route exact path="/perfil" component={ PerfilPage } />
      <Route exact path="/comidas/:id-receita" component={ ComidaDetailPage } />
      <Route exact path="/bebidas/:id-receita" component={ BebidaDetailPage } />
      <Route
        exact
        path="/comidas/:id-receita/in-progress"
        component={ ProgressComidaPage }
      />
      <Route
        exact
        path="/bebidas/:id-receita/in-progress"
        component={ ProgressBebidaPage }
      />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ComidasIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ BebidasIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ComidaArea } />
      <Route exact path="/receitas-feitas" component={ ReceitaFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitaFavorita } />
>>>>>>> main-group-8
    </Switch>
  </BrowserRouter>
);

export default Routes;
