import styled from 'styled-components';

const Styles = {
  BtnBar: styled.div`
  align-items: center;
  background-color: rgba(14,116,77,1);
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  justify-content: center;
  margin-bottom: 0.5rem;
  width: 100vw;
`,
  Btn: styled.button`
  background: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.2em;
  margin: 0.3rem;
  height: 2rem;
  width: auto;
  :focus {
    background: ${({ toggle }) => (toggle ? 'rgba(226,226,226,1)' : 'white')};
    box-shadow: ${({ toggle }) => (toggle ? '0 1px 4px rgba(0,0,0,0.46)' : 'none')};
    outline: none;
  }
`,
};

export default Styles;
