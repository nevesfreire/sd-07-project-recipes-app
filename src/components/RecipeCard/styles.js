import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const StyledCard = styled(Card)`
  width: 161px;
  height: 172px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  img {
    width: 161px;
    height: 109px;
  }
`;

export default StyledCard;
