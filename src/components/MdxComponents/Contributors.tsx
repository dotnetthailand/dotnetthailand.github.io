import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';

const style = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    width: 100px;
    text-align: center;
    margin: 5px;
  }
`;

const Contributors = () => {

  const { allContributor } = useStaticQuery(graphql`
    query queryContributors {
      allContributor {
        nodes {
          avatar_url
          html_url
          contributions
          login
          id
        }
      }
    }
  `);

  const contributors = allContributor.nodes;
  return (
    <div css={style}>
      { contributors.map(contributor => {
        return (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a key={contributor.id} href={contributor.html_url} target='_blank'>
            <img alt={contributor.login} src={contributor.avatar_url} />
            <span>{contributor.login}</span>
          </a>
        );
      })
      }
    </div>
  )
};

export default Contributors;
