import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Remark } from 'react-remark';
import ContributorsDetail from './ContributorsDetail';
import styled from '@emotion/styled';

const ThankyouWrapper = styled.div`
  display: block;
  margin: 40px 0;
  width: 100%;
`;

const NoteWrapper = styled.div`
  display: block;
  margin: 60px 0 50px 0;
  width: 100%;
`;

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

  useEffect( ()=> {
    // For accessing author by URL
    if (searchParams.has('author')) {
      const username = searchParams.get('author');
      setSelectedAuthor(username);
    }else {
      setSelectedAuthor('');
    }
  },[]);

  return (
    <>

      <div css={style(theme)}>
        <div className="wrapper">
          {selectedAuthor === '' ? 
            <>
             <ThankyouWrapper >
              <div><b>{`Give credit where credit's due`}</b></div> 
              <div>Thank you so much to these contributors. Without you, .NET Thailand would not have happened.</div> 
             </ThankyouWrapper>
              
              {contributors.map(contributor => {
                return (
                  // eslint-disable-next-line react/jsx-no-target-blank
                  <a className="author-button" key={contributor.id}  href={`?author=${contributor.login}`} >
                    <img
                      alt={contributor.login}
                      src={contributor.avatar_url}
                    />
                    <span>{contributor.login}</span>
                  </a>
                );
              })}

            <NoteWrapper>
              <Remark>{`
# My profile does not show here after my PR got merged.
- If you profile does not show here, it is possible that your email in a commit does not match an email of your GitHub profile.
- https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/why-are-my-contributions-not-showing-up-on-my-profile#your-local-git-commit-email-isnt-connected-to-your-account
- https://www.quora.com/Why-doesnt-GitHub-include-my-name-as-a-contributor-even-after-I-contributed
          `}</Remark>
            </NoteWrapper>
            </>
        : 
        <ContributorsDetail username={selectedAuthor} /> }
        </div>
      </div>
    </>
  )
};

export default Contributors;
