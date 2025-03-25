import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { MDXProvider } from '@mdx-js/react'

// TODO use emotion object style
// import styled from '@emotion/styled';
// import { css } from '@emotion/core';

export default function CheckListItem(props: PropsWithChildren) {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    // toggle check
    setIsChecked(!isChecked);
  };

  return (
    <div className='check-list-item'>
      <label>
        <input type="checkbox" onClick={handleCheckboxClick} style={{ display: 'inline-block', marginRight: '10px' }} />
        <MDXProvider
          components={{
            // Transform p to inline span
            // eslint-disable-next-line react/display-name
            p: props => <span {...props} />
          }}
        >
          {props.children}
        </MDXProvider>
      </label>
    </div>
  )
};

