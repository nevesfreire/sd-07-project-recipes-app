import styled from 'styled-components';
import { Card, CardColumns } from 'react-bootstrap';

export const StyledCardText = styled(Card)`
  width: 327px;
  height: 82px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 37px;
  color: #000000;
`;

export const StyledCardColumns = styled(CardColumns)`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 20px;
`;
