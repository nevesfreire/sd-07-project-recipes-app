import styled from 'styled-components';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';

export const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;
`;

export const StyledToggleButton = styled(ToggleButton)`
  &.btn {
    flex: 1 1 105px;
  }
`;
