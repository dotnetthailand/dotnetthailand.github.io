import React, { useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { calculateNavigation } from '../';
import { Link } from "gatsby"
import { Nav } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import emoji from '../../utils/emoji';
import { onMobile } from '../../styles/responsive';

initializeIcons();

const style = (theme) => css`
  width: 280px;
  ${onMobile} {
    width: 100%;
  }
  margin-bottom: 30px;
  margin-right: 10px;

  .ms-Nav-compositeLink{
    background-color: white;

    a, a:visited{
      color: ${theme.navigationSidebar.font.base};
    }

    &.is-selected button{
      background: none;
    }
  }

  .ms-Nav-chevronButton{
    font-size: 16px;
  }

  .ms-Nav-navItem:hover{
    background-color: #f3f2f1;
  }
`;

const extractFirstLevelGroupId = (pathname) => {
  const trimLastSlash = pathname.replace(/\/$/, '');
  const trimFirstSlash = trimLastSlash.replace(/^\//, '');
  return trimFirstSlash.substr(0, trimFirstSlash.indexOf('/')); 
}

const extractSecondLevelGroupId = (pathname) => {
  const trimLastSlash = pathname.replace(/\/$/, '');
  const trimFirstSlash = trimLastSlash.replace(/^\//, '');
  const removedFirstLevel = trimFirstSlash.substr(trimFirstSlash.indexOf('/')).replace(/^\//, ''); 
  return removedFirstLevel.substr(0, removedFirstLevel.indexOf('/')); 
}

const calculateNavigationFluentUi = (calculatedNavigation, pathname) => {
  console.log(pathname);
  const navLinkGroups = [];
  calculatedNavigation.children.map(sourceNavGroup => {

    const isAccessByUrl = sourceNavGroup.title === '' ? false 
      : sourceNavGroup.id === extractFirstLevelGroupId(pathname) ? false : true;
    
    const navLinkGroup = {
      name: emoji.emojify(sourceNavGroup.title),
      collapseByDefault: isAccessByUrl,
      links: [],
      key: sourceNavGroup.id,
    }
    sourceNavGroup.children.map( sourceNav => {

     const isAccessByUrl = sourceNav.url.indexOf(extractSecondLevelGroupId(pathname)) > 0 ? true : false;
      const navLinkGroupTmp = {
        name: sourceNav.title,
        url: sourceNav.url,
        key: sourceNav.url,
        links: [],
        isExpanded: isAccessByUrl
      }
      
      sourceNav.children.map( sourceNavChild => {
        navLinkGroupTmp.links.push({
          name: sourceNavChild.title,
          url: sourceNavChild.url,
          key: sourceNavChild.url,
        });
      });

      navLinkGroup.links.push(navLinkGroupTmp);
    });
    navLinkGroups.push(navLinkGroup);
  });
  return navLinkGroups;
}

const ContentTree = ({ edges, location }) => {
  const [treeData] = useState(() => calculateNavigationFluentUi(calculateNavigation(edges), location.pathname));
  const theme = useTheme();
  console.log(location);
  const onRenderLink = (link, linkRender) => {
    return () => ({ link, linkRender });
  };

  const linkAs = props => {
    // Ref: https://codesandbox.io/s/93olj3k1xr?file=/src/component/ContextMenuNav.js:2431-2435
    return (
      <Link to={props.link.url} {...props} >
        {props.link.name}
      </Link>
    );

  }

  return (
    <>
      <div css={style(theme)}>
        <Nav
          ariaLabel="Nav menu"
          groups={treeData}
          linkAs={linkAs}
          onRenderLink={onRenderLink}
          selectedKey={location.pathname.replace(/\/$/, '')}
        />
      </div>

    </>
  );
};

export default ContentTree;
