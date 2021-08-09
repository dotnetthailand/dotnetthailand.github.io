import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import ContributorsDetail from './ContributorsDetail';
import { useState } from 'react';
import { useEffect } from 'react';

const style = theme => css`
  .wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .author-button {
    background: none;
    border: none;
    cursor: pointer;
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

  .back-button{
    background: none;
    border: none;
    cursor: pointer;
    padding: 20px;

    &:hover{
      background-color: #d8d8d8;
    }
  }
`;

const query = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : '';

const Contributors = () => {

  const [selectedAuthor, setSelectedAuthor] = useState('');

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

  // For accessing author by URL
  if (searchParams.has('author')) {
    const username = searchParams.get('author');
    return <ContributorsDetail username={username} />
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, username) => {
    event.preventDefault();
    setSelectedAuthor(username);
  };

  const handleBack = () => {
    setSelectedAuthor('');
  }

  return (
    <div css={style(theme)}>
      <div>
        {selectedAuthor !== '' && <button className="back-button" onClick={() => handleBack()} >Back</button>}
      </div>
      <div className="wrapper">

        {selectedAuthor === '' ?
          contributors.map(contributor => {
            return (
              // eslint-disable-next-line react/jsx-no-target-blank
              <button className="author-button" key={contributor.id} onClick={(e) => handleClick(e, contributor.login)} >
                <img
                  alt={contributor.login}
                  src={contributor.avatar_url}
                />
                <span>{contributor.login}</span>
              </button>
            );
          })
          :
          <ContributorsDetail username={selectedAuthor} />}
      </div>
    </div>
  )
};

export default Contributors;
