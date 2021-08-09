import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import axios from 'axios';
import { useEffect } from 'react';

const axiosConfig = {
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
}

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

  const [commitList, setCommitList] = useState([]);
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
    console.log('Rerender');

    useEffect(()=> {
      const fetch = async () => {
        const data = (await axios.get(`https://api.github.com/repos/dotnetthailand/dotnetthailand.github.io/commits?author=${username}`, axiosConfig)).data;
        const commitListTmp = data.map(commit => ({
          date: commit?.commit?.author?.date,
          message: commit?.commit?.message,
          url: commit?.url,
        }))
        setCommitList(commitListTmp);
      }
  
      fetch();
    }, []);


    return (
      <div>
        {commitList.map(commit => (
          <div key={commit.url}>{commit.date}, {commit.message}</div>
        ))}
      </div>
    )
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
