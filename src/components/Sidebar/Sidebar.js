import React from 'react';
import styled from '@emotion/styled';
import config from 'config';
import ContentTree from './contentTree';
import Links from './links';
import PoweredBy from './poweredBy';
import { getNavigationData } from '../Navigation';
import { scrollbar } from '../../styles';
import { onMobile } from '../../styles/responsive';

const Sidebar = styled.div`
  margin-left: 20px;
  height: 100%;
  min-height: 0;
  display: flex;
  overflow-y: hidden;
  align-items: stretch;
  flex-direction: column;
  ${onMobile} {
    margin-left: 10px;
  }
`;

const SidebarMain = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
  width: 100%;
  margin: 0;
  display: block;
  padding: 0;
  margin-top: 80px;
  padding-top: 32px;
  ${onMobile} {
    flex: 0 1 auto;
  }
`;

const PoweredByWrapper = styled.div`
  flex: 0 1 auto;
  display: block;
  padding: 0;
  position: relative;
  box-shadow: 0 -7px 10px -5px ${(props) => props.theme.navigationSidebar.backgroundPrimary};
`;

const NavigationWrapper = styled(({ className, children }) => {
  return (
    <aside className={className}>
      <Sidebar>{children}</Sidebar>
    </aside>
  );
})`
  display: ${(props) => props.show ? 'block' : 'none'};
  top: 0;
  flex: 0 0 ${(props) => props.theme.layout.leftWidth};
  background: ${(props) => props.theme.navigationSidebar.backgroundPrimary};
  background: linear-gradient(
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(${(props) => props.theme.navigationSidebar.backgroundPrimary}),
    to(${(props) => props.theme.navigationSidebar.backgroundSecondary})
  );
  /* Safari 5.1, Chrome 10+ */
  background: -webkit-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* IE 10 */
  background: -ms-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* Opera 11.10+ */
  background: -o-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  border-right: 1px solid ${(props) => props.theme.navigationSidebar.border};
  position: sticky;
  ${onMobile} {
    width: 100%;
    height: auto;
    border-right: none;
    position: relative;
    background: ${(props) => props.theme.navigationSidebar.backgroundPrimary};
  }
`;

const Divider = styled((props) => (
  <div {...props}>
    <hr />
  </div>
))`
  padding: 0.5rem 0;
  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.navigationSidebar.border};
  }
`;
const ContentNavigation = ({ show, className, location, menuOpen }) => {
  const edges = getNavigationData();
  return (
    <NavigationWrapper className={className} show={show}>
      <SidebarMain css={scrollbar} id="sidebar-main-scrollbar">
        <ContentTree edges={edges} location={location} menuOpen={menuOpen}/>
        {config.sidebar.links && config.sidebar.links.length > 0 ? (
          <>
            <Divider />
            <Links links={config.sidebar.links} />
          </>
        ) : null}
      </SidebarMain>
      {config.sidebar.poweredBy && config.sidebar.poweredBy.name ? (
        <>
          <PoweredByWrapper>
            <PoweredBy
              trademark={config.sidebar.poweredBy.trademark}
              name={config.sidebar.poweredBy.name}
              link={config.sidebar.poweredBy.link}
            />
          </PoweredByWrapper>
        </>
      ) : null}
    </NavigationWrapper>
  );
};

export default ContentNavigation;
