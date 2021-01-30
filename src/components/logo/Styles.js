import styled, { keyframes } from 'styled-components';

const appearEffect = () => keyframes`
    0% {
      -webkit-transform: translateY(5px);
      -moz-transform: translateY(5px);
      -ms-transform: translateY(5px);
      -o-transform: translateY(5px);
      transform: translateY(5px);
    }
    `;

const Styles = {
  SvgContainer: styled.svg`
  width: ${(p) => p.width};
  border-radius: ${(p) => p.borderRadius};
`,
  Background: styled.path`
  fill: ${(p) => p.color};  
`,
  Spoon: styled.path`
  fill: ${(p) => p.color};
`,
  Text: styled.g`
  fill: ${(p) => p.color}
  `,
  Animated: styled.g`
  animation: ${({ animation }) => animation && appearEffect} 1s ease-in;
  `,
};

export default Styles;
