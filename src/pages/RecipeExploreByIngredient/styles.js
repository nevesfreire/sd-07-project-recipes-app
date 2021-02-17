import styled from 'styled-components';
import { Card, CardColumns } from 'react-bootstrap';

export const StyledCard = styled(Card)`
  width: 161px;
  height: 172px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

export const StyledCardColumns = styled(CardColumns)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;
