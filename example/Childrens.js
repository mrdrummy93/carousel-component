import styled from 'styled-components';
import { ELEMENT_WIDTH } from './constants';

export default styled.div`
  width: ${ELEMENT_WIDTH}px;
  height: 400px;
  background-color: ${(props) => props.color};
  margin: 10px;
`;
