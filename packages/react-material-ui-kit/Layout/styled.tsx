import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageBodyProps {}

export const PageBody = styled.main<PageBodyProps>`
  padding: 24px;
`;

export const LayoutRoot = styled.div`
  display: grid;
  grid-template:
    'navigation header'
    'navigation body';

  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;

  // On small screens side navigation should hover screen
  ${({ theme }) => theme.mui.breakpoints.down('sm')} {
    grid-template:
      'header'
      'body';
  }
`;
