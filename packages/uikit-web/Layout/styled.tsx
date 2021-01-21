import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageBodyProps {}

export const PageBody = styled.main<PageBodyProps>`
  padding: 24px;
`;

export const LayoutRoot = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template:
    'navigation header'
    'navigation body';

  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  // On small screens side navigation should hover screen
  ${({ theme }) => theme.mui.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'body';
  }
`;
