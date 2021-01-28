import React from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Explorar extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.resetState();
  }

  resetState() {
    this.setState({ redirect: null });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to={ redirect } />}
        <Header pageTitle="Explorar" />
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => this.setState({ redirect: '/explorar/comidas' }) }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => this.setState({ redirect: '/explorar/bebidas' }) }
        >
          Explorar Bebidas
        </button>
        <Footer />
      </div>
    );
  }
}

export default Explorar;
