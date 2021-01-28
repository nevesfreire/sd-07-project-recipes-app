import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Search from './Search';
import Options from './SearchButton';
import SearchButton from './SearchButton';

export default function SearchBarHeader(props) {
  cosnt[(searchNice, setSearchNice)] = useState(false);
  const update = () => {
    setSearchNice(!searchNice);
  };
  return (
    <div className="Gusta-css">
      <Header
        titile={props.title}
        setSearchNice={update}
        searchNice={searchNice}
      />
      <div className="GUsta-css">
        { searchNice ? <Search /> : null }
        { searchNice ? <Options /> : null }
        { searchNice ? <SearchButton automatic={ props.automatic } /> : null}
      </div>
    </div>
  );
}

BarraBuscaHeader.propTypes = {
  title: PropTypes.string.isRequired,
  automatic: PropTypes.bool.isRequired,
};
