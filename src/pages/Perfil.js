import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Perfil extends React.Component {
  render() {
    const { history, email } = this.props;
    const emailLocal = JSON.parse(localStorage.getItem('user'));

    return (
      <Container fluid="p-0" className="profile">
        <Header pageTitle="Perfil" />
        <h4 data-testid="profile-email" style={ { marginTop: '45px' } }>
          {!emailLocal ? email : emailLocal.email}
        </h4>
        <Col style={ { marginLeft: '186px' } }>
          <Row style={ { marginBottom: '10px', marginTop: '60px' } }>
            <Button
              style={ { width: '150px', color: 'black' } }
              variant="outline-warning"
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/receitas-feitas') }
            >
              Receitas Feitas
            </Button>
          </Row>
          <Row style={ { marginBottom: '10px' } }>
            <Button
              style={ { width: '150px', color: 'black' } }
              variant="outline-warning"
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/receitas-favoritas') }
            >
              Receitas Favoritas
            </Button>
          </Row>
          <Row style={ { marginBottom: '10px' } }>
            <Button
              style={ { width: '150px', color: 'black' } }
              variant="outline-warning"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => { history.push('/'); localStorage.clear(); } }
            >
              Sair
            </Button>
          </Row>
        </Col>
        <Footer />
      </Container>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({ email });

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Perfil);
