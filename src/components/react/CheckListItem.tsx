import type { PropsWithChildren } from 'react';
export default function CheckListItem(props: PropsWithChildren) {

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
// https://stackblitz.com/edit/md-in-react-component-issue-fexq4mr6?file=README.md
