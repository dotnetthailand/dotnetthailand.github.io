import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { calculateNavigation } from '../';
import { Link } from "gatsby"
import { Nav } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import emoji from '../../utils/emoji';
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

  .ms-Nav-compositeLink{
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

    sourceNavGroup.children.map( sourceNav => {
     const isAccessByUrl = sourceNav.url.indexOf(extractLevelGroupID(pathname)[1]) > 0;
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

const ContentTree = ({ edges, location, menuOpen }) => {
  const [treeData] = useState(() => calculateNavigationFluentUI(calculateNavigation(edges), location.pathname));
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

  const handleLinkClick = () => {
    const element = document.getElementById('scroll-to-top-main-content');
    element?.scrollTo(0,0);
  };

  useEffect(()=> {
    const sidebarElements = document.getElementsByClassName('ms-Nav-compositeLink is-selected');
    if(sidebarElements.length > 0) {
      sidebarElements[0].scrollIntoView({block: "center", inline: "nearest"});
    }
  },[menuOpen]);

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
