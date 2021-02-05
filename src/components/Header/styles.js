import styled from 'styled-components';
import { Accordion, Card, Image } from 'react-bootstrap';

export const StyledAccordion = styled(Accordion)`
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
  div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
  }
`;
