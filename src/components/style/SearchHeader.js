import styled from 'styled-components';

const SearchHeaderStyle = {
  Container: styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`,
  SearchBar: styled.input`
  align-items: center;
  border: none;
  border-radius: 1rem 0 0 1rem;
  display: flex;
  text-align: center;
  font-size: 1em;
  height: 30px;
  width: 40vw;
  :focus {
    box-shadow: 0 1px 4px rgba(0,0,0,0.46);
    outline: none;
  }
`,
  RadioBtnsContainer: styled.div`
  display: flex;
  flex-wrap: wrap;
  `,
  SearchBtn: styled.button`
  align-items: center;
  background: white;
  border: none;
  border-radius: 0 1rem 1rem 0;
  display: flex;
  font-size: 1em;
  font-weight: 600;
  height: 100%;
  :focus {
    box-shadow: 0 1px 4px rgba(0,0,0,0.46);
    outline: none;
  }
  `,
};

export default SearchHeaderStyle;
