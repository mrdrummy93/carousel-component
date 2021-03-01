import styled from 'styled-components';

export default styled.div`
  margin: 40px;
  outline: 5px solid black;
  flex: 1;
  justify-content: center;
  overflow: hidden;
  width: ${(props) => props.width}px;
`;
