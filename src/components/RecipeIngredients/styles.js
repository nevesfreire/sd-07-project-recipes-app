import styled from 'styled-components';

export const Container = styled.div`
`;

export const StyledUL = styled.ul`
  list-style-type: none;
`;

export const Item = styled.li`
  label {
    input {
      margin-right: 10px;
    }
  }
`;

export const DoneItem = styled(Item)`
  label {
    text-decoration: line-through;
  }
`;
