import styled from 'styled-components';
import { Navbar, Card, Image } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)`
  padding: 0;
  background: #C4C4C4;
`;

export const StyledTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 35px;
  color: #000000;
`;

export const StyledImage = styled(Image)`
`;

export const StyledCard = styled(Card)`
  background: #C4C4C4;
  flex-basis: 360px;
  div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
  }
`;
