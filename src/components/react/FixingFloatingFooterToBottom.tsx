import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

// https://www.dhiwise.com/post/understanding-react-propswithchildren-a-comprehensive-guide
export default function FixingFloatingFooterToBottom(
  { marginTopValue = 0, children }: PropsWithChildren<{ marginTopValue: number | string }>
) {
  return (
    <MainContainer>
      <MainContent>
        <div>main-content</div>
        {children}
      </MainContent>
      <Footer $marginTopValue={marginTopValue}>
        <span>footer content...</span>
      </Footer>
    </MainContainer>
  )
};

const MainContainer = styled.div`
  border: 1px dotted var(--sl-color-white);
  max-width: 800px;
  margin: auto;
  min-height: 40vh;
  @media (min-width: 576px) {
    min-height: 30vh;
  }

  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  color: var(--sl-color-white) ;
  padding: 10px;

  > div {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const Footer = styled.div<{ $marginTopValue: number | string }>`
  border: 1px dotted var(--sl-color-white);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.$marginTopValue} !important;
`;
