import React, { useState, useEffect, useMemo } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { calculateNavigation } from '../';
import { Link } from "gatsby"
import { Nav } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import emoji from '../../utils/emoji';
import { syncFunction } from '../../utils/utils';
import { onMobile } from '../../styles/responsive';

// initialize Icons for Fluent UI
// Load Font Icons from locally, not from MS Cdn
// By fix issue: failed load font icon on production
// Ref: https://dev.to/lybekk/how-to-use-fluent-ui-icons-in-gatsby-277e
initializeIcons('/assets/fluenticons/');

// Official Way to customize Fluent UI CSS
const navStyles = props => {
  const { isGroup } = props;
  return {
    chevronButton:[
      // Add custom css class for override group element
      isGroup && 'is-group'
    ]
  }
}

// Override Fluent UI CSS (Not good way)
const style = theme => css`
  width: ${theme.layout.leftWidth};
  ${onMobile} {
    width: 100%;
  }
  margin-bottom: 30px;
  margin-right: 10px;

  .ms-Nav-compositeLink {
    background: none;
    a, a:visited{
      color: ${theme.navigationSidebar.font.base};
    }

    &.is-selected button{
      background: none;
    }
    &.is-selected {
      background-color: ${theme.navigationSidebar.backgroundActive};
    }
    &:hover{
      background-color: ${theme.navigationSidebar.backgroundHover};
    }
  }

  .ms-Nav-chevronButton{
    font-size: 16px;
    color: ${theme.navigationSidebar.font.base};

    // Not official css class, overriding from above.
    &.is-group{
      border-bottom: 1px solid ${theme.navigationSidebar.divider};
    }

    &:after{
      border: none !important;
    }
  }

  .ms-Nav-groupContent{
    margin-left: 15px;
  }

  .ms-Nav-navItem .ms-Nav-link:hover{
    color: ${theme.navigationSidebar.font.hover}
  }

  .ms-Nav-link{
    background: none !important;
  }
`;

const extractLevelGroupID = pathname => pathname.replace(/(^\/|\/$)/g, '').split('/');

const getDeepNavigation = (navItemGroup, navLinkGroup, pathname, deepLevel) => {
    // Exit recursive when children.length = 0
    navItemGroup.children.map( childNavItemGroup => {
     const isAccessByUrl = childNavItemGroup.url.indexOf(extractLevelGroupID(pathname)[deepLevel]) > 0;
      const navLinkGroupTmp = {
        name: childNavItemGroup.title,
        url: childNavItemGroup.url,
        key: childNavItemGroup.url,
        isExpanded: isAccessByUrl
      }

      const deepNavigationLinks = getDeepNavigation(childNavItemGroup, [], pathname, deepLevel + 1);
      if(deepNavigationLinks.length > 0) 
        navLinkGroupTmp.links = deepNavigationLinks;
      navLinkGroup.push(navLinkGroupTmp);

    });
    return navLinkGroup;
}

const calculateNavigationFluentUI = (calculatedNavigation, pathname) => {
  const navLinkGroups = [];
  calculatedNavigation.children.map(sourceNavGroup => {

    const isAccessByUrl = 
      sourceNavGroup.title === '' ? false : 
      sourceNavGroup.id !== extractLevelGroupID(pathname)[0];
    
    const navLinkGroup = {
      name: emoji.emojify(sourceNavGroup.title),
      collapseByDefault: isAccessByUrl,
      links: [],
      key: sourceNavGroup.id,
    }

    navLinkGroup.links = getDeepNavigation(sourceNavGroup, [], pathname, 1);
    navLinkGroups.push(navLinkGroup);
  });
  return navLinkGroups;
}

const ContentTree = ({ edges, location, menuOpen }) => {
  const memoizedCalculatedNavigation = useMemo(() => calculateNavigation(edges));
  const [navClickStatus, setNavClickStatus] = useState(false);
  const [treeData, setTreeData] = useState(() => calculateNavigationFluentUI(memoizedCalculatedNavigation, location.pathname));
  const theme = useTheme();
  const onRenderLink = (link, linkRender) => {
    return () => ({ link, linkRender });
  };

  const linkAs = props => {
    // Ref: https://codesandbox.io/s/93olj3k1xr?file=/src/component/ContextMenuNav.js:2431-2435
    return (
      <Link  id={props.link.key} to={props.link.url} {...props} >
        {props.link.name}
      </Link>
    );

  }

  const handleLinkClick = (ev, link) => {
    // Expand nav on clicking link
    link.isExpanded = true;
    // Debounce click nav state to prevent unnecessarily moving to active nav button
    setNavClickStatus(true);
    setTimeout(() => setNavClickStatus(false), 200);
  };

  const goToActiveNav = () => {
    const sidebarElements = document.getElementsByClassName('ms-Nav-compositeLink is-selected');
    if(sidebarElements.length > 0) {
      sidebarElements[0].scrollIntoView({block: "center", inline: "nearest"});
    }
  }

  useEffect(()=> {
    goToActiveNav();
  },[menuOpen]);
  
  useEffect(()=> {
    // Prevent unnecessarily moving to active nav button
    if(!navClickStatus) {
      // This active should be executed only other event route path changed, such as clicking item on search result.
      // Make sure every time that the route path is changed, then go to the active Nav button.
      syncFunction(() => setTreeData(calculateNavigationFluentUI(memoizedCalculatedNavigation, location.pathname)))
        .then(() => goToActiveNav());
    }

    // When the route path is changed, scroll the content to top, such as clicking item on search result, clicking on nav menu.
    document.getElementById('scroll-to-top-main-content')?.scrollTo(0,0);
  },[location.pathname]);

  return (
    <>
      <div css={style(theme)}>
        <Nav
          styles={navStyles}
          ariaLabel="Nav menu"
          groups={treeData}
          linkAs={linkAs}
          onRenderLink={onRenderLink}
          onLinkClick={handleLinkClick}
          selectedKey={location.pathname.replace(/\/$/, '')}
        />
      </div>
    </>
  );
};

export default ContentTree;
