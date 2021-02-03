import styled from 'styled-components';

const Styles = {
  Btn: styled.button`
  background: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.2em;
  margin: 0.3rem;
  height: 2rem;
  width: auto;
  :focus {
    background: rgba(226,226,226,1);
    box-shadow: 0 1px 4px rgba(0,0,0,0.46);
    outline: none;
  }
`,
};

export default Styles;
