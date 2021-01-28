import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userlogo from '../../images/profileIcon.svg';
import IconSearch from '../../images/searchIcon.svg';
import CupNodesContext from '../../contexts/CupNodesContext';

function firstUpCase(text = '') {
  let palavras = text.split(' ');
  palavras = palavras.map((palavra) => {
    const first = palavra[0].toUpperCase();
    const rest = palavra.slice(1);
    return first + rest;
  });
  return palavras.join(' ');
}

export default function Header(props) {
  const { searchNice, setSearchNice, title, topSearch } = props;
  const { setTitle } = useContext(CupNodesContext);
  useEffect(() => {
    setTitle(title);
  }, [title]);
  const newTitle = firstUpCase(title);
  return (
    <div className="gusta-css-Header">
      <Link to="/perfil" className="top-btn-gusta-css">
        <img src={userlogo} alt="Imagem user" data-testid="profile-top-btn" />
      </Link>
      <div data-testid="page-title" className="bar-search-gusta-css">
        <span>{newTitle}</span>
      </div>
      <div
        style={{ visibility: topSearch ? 'hidden' : 'visible' }}
        className="Top-Btn-gusta-css"
      >
        <Link
          onClick={() => setSearchNice(!searchNice)}
          className="Top-Btn-gusta-css"
        >
          <img
            src={IconSearch}
            alt="Search Logo"
            data-testid="search-top-btn-gusta-css"
          />
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchNice: PropTypes.bool.isRequired,
  setSearchNice: PropTypes.func.isRequired,
  topSearch: PropTypes.bool.isRequired,
};
