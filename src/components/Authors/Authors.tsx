
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import axios from 'axios';

/*
Require: config.features.editOnRepo.editable = true
We collect `Author` field, ref: https://stackoverflow.com/a/6755848/4540808
*/

export interface IAuthorsProps{
  className: string;
  path: string;
  repoType: string;
  repo: string;
  contentRootPath: string;
  locationPathname: string;
}

export interface IAuthorInfo{
  username?: string; 
  name: string;
  commits: number;
  url: string;
}

const initAuthorList :IAuthorInfo[] = [];

const Authors = styled(({ className, path,  repoType, repo, contentRootPath, locationPathname}: IAuthorsProps) => {
  const [authorList, setAuthorList] = useState(initAuthorList);
  const [lastUpdate, setLastUpdate] = useState('');
  if (repoType.toLowerCase() !== 'github') return <></>;
  const contributorsGithubAPI = `https://api.github.com/repos/${repo}/commits?path=/${contentRootPath}/${path}`;

  const fetchContributors = async () => {

    const axiosConfig = {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }
    const response = await axios.get(contributorsGithubAPI,axiosConfig);
    console.log(response.data);

    const authors: Record<string, IAuthorInfo> = {};
    response.data.map( commit => {
      // Get Github username or Email.
      const author = commit?.author?.login || commit?.commit?.author.email;
      if(!author) return;
      console.log(commit);
      if (author in authors){
        authors[author].commits ++;
      } else{
        authors[author] = {
          name: commit?.commit?.author.name,
          commits: 1,
          url: commit?.author?.html_url ||  commit?.html_url,
        }
      } 
    });

    const authorListTmp:IAuthorInfo[] = [];
    for (const [key, value] of Object.entries(authors)) {
      authorListTmp.push({
        ...value,
        username: key
      });
    }
    authorListTmp.sort((a, b) => (a.commits < b.commits) ? 1 : -1);
    setAuthorList([...authorListTmp]);

    // Last update
    const lastCommitDate = response.data[0].commit.author.date;
    setLastUpdate(format(new Date(lastCommitDate),"MMM dd, yyyy"));
  }

  useEffect(()=> {
    fetchContributors();
  }, []);

  useEffect(()=> {
    setAuthorList([]);
    fetchContributors();
  }, [locationPathname]);
  
  return (
    <span className={className}>
     Last update: {lastUpdate}<br/>
     Authors: {authorList.map((author, authorIndex) => (
       <span key={author.username}><a href={author.url} target="_blank" rel="noreferrer">{author.name}</a>
       {authorList.length -1 === authorIndex? '' : ', '}
       </span>
     ))}
    </span>
  );

})`
  font-size: 12px;
  display: block;

  a, a:active, a:visited { 
    color: ${(props) => props.theme.colors.primary}
  }

  a:hover {
    color: ${(props) => props.theme.colors.primaryDark}
  }
`;
export default Authors;
