import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './style/ProgressIngredients.css';
import RecipesContext from '../context/RecipesContext';

function ProgressIngredients(props) {
  // const [isChecked, setIsChecked] = useState(false);
  const { setCounter } = useContext(RecipesContext);
  const { recipeIngredients } = props;
  const handleChecked = (event) => {
    const { checked } = event.target;
    // console.log(event.currentTarget);
    if (checked) {
      // console.log('oi');
      // event.target.parentNode.style.setProperty('text-decoration', 'line-through');
      // element.setAttribute('style', 'text-decoration: line-through;');
      // event.style.textDecoration = 'line-through';
      event.target.parentNode.className = 'used-ingredient';
      setCounter((counter) => counter + 1);
    } else {
      event.target.parentNode.className = '';
      setCounter((counter) => counter - 1);
    }
    // return checked ? setIsChecked(true) : setIsChecked(false);
  };
  return (
    <div>
      {recipeIngredients.map((ingredient, index) => {
        const ingredientName = Object.keys(ingredient);
        const ingredientQty = Object.values(ingredient);
        return (
          <div key={ ingredientName[0] }>
            <label
              htmlFor={ ingredientName[0] }
              data-testid={ `${index}-ingredient-step` }
              // data-testid="ingredient-step"
              // style={ { textDecoration: isChecked ? '' : '' } }
            >
              <span
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredientName[0]}: ${ingredientQty[0]} ` }
              </span>
              <input
                type="checkbox"
                name={ ingredientName[0] }
                id={ ingredientName[0] }
                onChange={ (event) => handleChecked(event) }
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

ProgressIngredients.propTypes = {
  recipeIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProgressIngredients;
