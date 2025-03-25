/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';

const style = css`
  margin-top: 15px;

  h1{
    font-size: 1em;
  }

  a {
    color: #4193EC;
  }

  a:hover {
    color: #3773db;
  }
`;

const FriendsWebsites = () => {

  const { allFriendsWebsitesYaml } = useStaticQuery(graphql`
    query queryFriendsWebsites {
      allFriendsWebsitesYaml(sort: {fields: name, order: ASC}) {
        nodes {
          name
          url
          about
          id
        }
        totalCount
      }
    }
  `);

  const friendsWebsites = allFriendsWebsitesYaml.nodes;
  return (
    <div>
      { friendsWebsites.map(website => {
        return (
          <div key={website.id} css={style} >
            <h1>{website.name}</h1>
            <ul>
              <li><a href={website.url} target='_blank'>{website.url}</a></li>
              <li>{website.about}</li>
            </ul>
          </div>
        );
      })
      }
    </div>
  )
};

export default FriendsWebsites;
