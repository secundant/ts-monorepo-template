import styled from 'styled-components';

export const ArrowIconContainer = styled.span<{
  open: boolean;
}>`
  transition: transform 125ms;
  transform: scale(${p => (p.open ? -1 : 1)});
`;
