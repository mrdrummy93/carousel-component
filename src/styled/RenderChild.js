import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  transform: translate(${(props) => -props.position}px);
  margin-left: ${(props) => props.elementMargin}px;
  transition: ${(props) => (props.animated ? 'all 300ms 0ms' : '')};
  width: ${(props) => props.width}px;
`;
