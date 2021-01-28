import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CupNodesContext from '../../contexts/CupNodesContext';

export default function SearchButton(props) {
  const { setchangeFilter, changeFilter } = useContext(CupNodesContext);
  return (
    <div>
      <button
      type="submit"
        data-testid="exec=search-btn"
        className="gusta-css"
        onClick={ () => {
        props.automatic(true);
        setchangeFilter(changeFilter + 1);
        }
       }
      >
        Buscar...
      </button>
    </div>
  );
}

SearchButton.propTypes = { automatic: propTypes.bool.isRequired };
