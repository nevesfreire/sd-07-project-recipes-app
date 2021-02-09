import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
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
        <div
          style={ { height: '90vh' } }
        >
          <Col style={ { marginTop: '30%' } }>
            <Button
              style={ { color: 'black' } }
              variant="outline-warning"
              type="button"
              data-testid="explore-food"
              onClick={ () => this.setState({ redirect: '/explorar/comidas' }) }
            >
              Explorar Comidas
            </Button>
            <Row style={ { marginTop: '5px', marginLeft: '173px' } }>
              <Button
                style={ { color: 'black' } }
                variant="outline-warning"
                type="button"
                data-testid="explore-drinks"
                onClick={ () => this.setState({ redirect: '/explorar/bebidas' }) }
              >
                Explorar Bebidas
              </Button>
            </Row>
          </Col>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Explorar;
