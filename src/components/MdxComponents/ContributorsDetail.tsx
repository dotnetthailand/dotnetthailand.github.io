import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const axiosConfig = {
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
}

interface IFile {
  commitCount: number;
  filename: string;
}

const setTimeoutPromise = (timeout: number) => new Promise(resolve => {        
  setTimeout(resolve, timeout);
});


const fetchRetry = async (url: string, delayTime: number, limit: number): Promise<any> => {
  console.log(`[limit:${limit}] Fetch from ${url}: `);
  if(limit < 0){
      console.warn(`Try to fetch '${url}' over limit`);
      return;
  }
  try {
      return axios.get(url, axiosConfig);
  } catch (e) {
      console.warn(`Something wrong: ${e}`);
      await setTimeoutPromise(delayTime * 1000);
      return fetchRetry(url, delayTime, limit - 1);
  }
}

const isContent = (filename: string) => {
  return /^content/gm.test(filename);
}

const initFiles = [];

const ContributorsDetail = ({ username }: { username: string }) => {

  const [files, setFiles] = useState(initFiles);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = (await fetchRetry(`https://api.github.com/repos/dotnetthailand/dotnetthailand.github.io/commits?author=${username}`,3 , 3)).data;
      const commitListTmp = data.map(commitData => ({
        date: commitData?.commit?.author?.date,
        message: commitData?.commit?.message,
        url: commitData?.url,
      }));

      const fileDictionary:Record<string, IFile> = {}; 

      for (const commitData of commitListTmp) {
        // const commitData = commitListTmp[0];
        console.log(commitData);
        const commitFiles = (await fetchRetry(commitData?.url, 3, 3)).data;
        console.log(commitFiles.files);
        for (const commitFile of commitFiles.files) {

          console.log(commitFile);
          if(!isContent(commitFile.filename)) continue;

          const uniqueFile = fileDictionary[commitFile.filename];
          if (uniqueFile) {
            fileDictionary[commitFile.filename].commitCount ++;
          } else {
            fileDictionary[commitFile.filename] = { commitCount: 1, filename: commitFile.filename }
          }
        }
        
        console.log(fileDictionary)
        
        const serializedFileList = Object.entries(fileDictionary)
          .map(([, file]) => file)
          .sort((a, b) => (a.commitCount < b.commitCount) ? 1 : -1);

        setFiles(serializedFileList);
        console.log(serializedFileList)
        // Create a unique file path

        // update state

      }
      setLoading(false);
    }

    fetch();
  }, []);

  return (
    <div>
      <div>{loading && `Loading....... `}</div>
      {files.map((file: IFile) => (
        <div key={file.filename}>{file.filename} ({file.commitCount})</div>
      ))}
    </div>
  )
};

export default ContributorsDetail;
