import React from 'react';
import styled from '@emotion/styled';
import AlgoliaLogoLight from 'images/search-by-algolia-light-background.svg';

const Wrapper = styled.div`
  margin: 0 30px;
`;
 
const AlgoliaLogo = () => {
  return (
    <Wrapper>
      <img css={{display: 'inline-block'}} src={AlgoliaLogoLight} alt="AlgoliaLogoLight"/>
    </Wrapper>
  );
};

export default AlgoliaLogo;