import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import ContributorsDetail from './ContributorsDetail';

const style = theme => css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    display: flex;
    align-items: center;
    width: 250px;
    padding: 16px;
    color: ${theme.colors.primary};
    transition: ${theme.transitions.hover};

    &:hover {
      color: ${theme.header.font.hover};
    }

    & > img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }

    & > span {
      text-align: left;
      padding-left: 8px;
    }
  }
`;


const query = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : '';

const Contributors = () => {

  const theme = useTheme();
  var searchParams = new URLSearchParams(query);
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

  if (searchParams.has('author')) {
    const username = searchParams.get('author');
    return <ContributorsDetail username={username} />
  }

  return (
    <div css={style(theme)}>
      {contributors.map(contributor => {
        return (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a key={contributor.id} href={`?author=${contributor.login}`} >
            <img
              alt={contributor.login}
              src={contributor.avatar_url}
            />
            <span>{contributor.login}</span>
          </a>
        );
      })
      }
    </div>
  )
};

export default Contributors;
