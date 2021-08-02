import React, { useState } from 'react';
import ContentTreeGroup from './contentTreeGroup';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { calculateNavigation } from '../';
// import { Link } from '../';
import { Link } from "gatsby"
import { Nav, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(/* optional base url */);

const style = (theme) => css`
  .ms-Nav-compositeLink{
    background-color: white;

    a, a:visited{
      color: ${theme.navigationSidebar.font.base};
    }
  }

`;

const calculateNavigationFluentUi = (calculatedNavigation) => {
  const navLinkGroups = [];
  calculatedNavigation.children.map(sourceNavGroup => {
    const navLinkGroup = {
      name: sourceNavGroup.title,
      links: []
    }
    sourceNavGroup.children.map( sourceNav => {
      navLinkGroup.links.push({
        name: sourceNav.title,
        url: sourceNav.url,
        key: sourceNav.url,
      });
    });
    navLinkGroups.push(navLinkGroup);
  });
  return navLinkGroups;
}

const ContentTree = ({ edges, location }) => {
  const [treeData] = useState(() => calculateNavigationFluentUi(calculateNavigation(edges)));
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState({});
  return (
    <>
      <div css={style(theme)}>
        <Nav
          ariaLabel="Nav example with nested links"
          groups={treeData}
          onRenderLink={(props) => (
            <Link to={props.url}>
              {props.name}
            </Link>
          )}
          onRenderGroupHeader={group => (
            <h3>{group.name}</h3>
          )}
        />
      </div>

      {/* {treeData.children.map((group) => {
        const key = group.path ? group.path : Math.random().toString(36).substring(2);
        return (
          <ContentTreeGroup
            treeState={{ collapsed: collapsed, setCollapsed: setCollapsed }}
            key={key}
            location={location}
            {...group}
          />
        );
      })} */}
    </>
  );
};

export default ContentTree;
