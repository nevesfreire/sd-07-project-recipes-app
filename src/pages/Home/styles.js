import styled from 'styled-components';
import { bgRecipes } from '../../images';

const Container = styled.div`
  background-color: #fff;
  display: flex;
  height: 100vh;
  flex-direction: column;
  flex-wrap: nowrap;
  top: 0;
  width: 100%;
  background-image: url(${bgRecipes});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Container;
