import { useState } from 'react';
import type { PropsWithChildren } from 'react';
//import { MDXProvider } from '@mdx-js/react'

// TODO use emotion object style
// import styled from '@emotion/styled';
// import { css } from '@emotion/core';
export default function CheckListItem(props: PropsWithChildren) {

  //const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxClick = () => {
    // toggle check
   // setIsChecked(!isChecked);
  };

  return (
    <div className='check-list-item'>
      <label> <input type="checkbox" className='check-box'/> {props.children} </label>
    </div>
  )
};

// https://github.com/mdx-js/mdx/issues/197
// https://github.com/withastro/astro/issues/4998
// https://github.com/withastro/astro/pull/4058
// https://github.com/withastro/astro/issues/3916
// https://github.com/withastro/astro/issues/3916
