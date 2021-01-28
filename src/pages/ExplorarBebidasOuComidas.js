import React from 'react';
import ExplorarComida from '../components/ExplorarComida';
import ExplorarBebida from '../components/ExplorarBebida';

class ExplorarComidas extends React.Component {
  render() {
    const { location: { pathname } } = this.props;
    console.log(pathname);
    return (
      <div>
        {pathname === '/explorar/comidas' && <ExplorarComida />}
        {pathname === '/explorar/bebidas' && <ExplorarBebida />}
      </div>
    );
  }
}

export default ExplorarComidas;
