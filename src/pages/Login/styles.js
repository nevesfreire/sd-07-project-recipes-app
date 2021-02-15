import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { bgLogin } from '../../images';

export const Container = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 100vh;
  justify-content: center;
  max-width: 1168px;
  top: 0;
  width: 100%;
  background-image: url(${bgLogin});
  background-repeat: no-repeat;
`;

export const StyledForm = styled(Form)`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled(Button)`
`;
