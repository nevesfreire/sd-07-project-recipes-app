import React from 'react';
import Card from '../index';
/* import data from '../../data'; */

class CardList extends React.Component {
  render() {
    /* const { results } = data;
    return (
      <div class="row">
        {results.map((item) => (
          <div class="col-6 justify-content-md-center">
            <Card card={ item } key={ item.title } />
          </div>
        ))}
      </div>
    ); */
    return <Card />;
  }
}

export default CardList;
