import React from 'react';
import { useHistory } from 'react-router-dom';
import FoodImage from '../images/mealIcon.svg';
import DrinkImage from '../images/drinkIcon.svg';
import ExploreImage from '../images/exploreIcon.svg';
import Mais from '../images/mais.png';

Footer () {
    const history = useHistory();
RedirectComidas() {
    history.push('/comidas');
}
RedirectBebidas() {
    history.push('/bebidas');
}
RedirectExplorar() {
    history.push('/explorar');
}
RedirectNovaReceita() {
    history.push('/nova-receita');
}

    return (
        <div data-testid="footer" className="Footer">
        <button
           className="ButtonFooter"
           type="button"
           data-testid="drinks-bottom-btn"
           onClick={ RedirectBebidas }
           src={ DrinkImage }
        >
            <img src={ DrinkImage } alt="drink-img" />
            bebidas
        </button>

        <button
            className="bottonFooter"
            type="button"
            data-testid="explore-bottom-btn"
            onClick={ RedirectExplorar }
            src={ ExploreImage }
        >
        <img src= { ExploreImage } alt="explore-img" />
         explorar
        </button>

        <button
             className="buttonFooter"
             type="button"
             data-testid="food-bottom-btn"
             onClick= { RedirectComidas }
             src= { FoodImage }

    >
        <img src= { FoodImage } alt="food-img" />
            Comidas
        </button>

         <button
             className="buttonFooter"
             type="button"
             onClick={ RedirectNovaReceita }
             src= { Mais }
        >
            <img src={ Mais } alt="plus-img" />
            Nova Receita
        </button>
        </div>
      );
     }
      export default Footer;
        