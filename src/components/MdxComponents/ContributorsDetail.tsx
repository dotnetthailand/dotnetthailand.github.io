import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const axiosConfig = {
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
}

const ContributorsDetail = ({ username }: { username: string }) => {

  const [commitList, setCommitList] = useState([]);
  
  useEffect(() => {
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
};

export default ContributorsDetail;
