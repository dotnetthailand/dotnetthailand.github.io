import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import {
  Header,
  MdxComponents,
  SearchSidebar,
  ScrollTop,
  Sidebar,
  TableOfContents,
  ThemeProvider,
} from '../';

import config from 'config';
import React, { useRef, useEffect, useState } from 'react';
import { Slide } from 'react-reveal';
import { hiddenMobile, hiddenTablet } from '../../styles';
import { onMobile, onTablet } from '../../styles/responsive';
import 'css';

const Wrapper = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  justify-content: space-between;
  position: relative;
  min-height: calc(100vh - 77px);

  ${onMobile} {
    min-height: calc(100vh - 61px);
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  flex-grow: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  min-height: 0;
`;

const MainContentScrollable = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

// We add min-width 1% to make flex-item not expand if it's child content wider than available space
const Content = styled('main')`
  min-width: 1%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 50px 70px;
  background-color: ${(props) => props.theme.content.background};

  ${onTablet} {
    padding: 30px;
  }
  ${onMobile} {
    padding: 15px;
  }
`;

/**
 * Hook that alerts clicks outside of the passed ref
 */
function actOnClose(ref, onClose) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(ref.current);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose(ref.current);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref]);
}

const Layout = ({ children, location }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [fullscreenMode, setFullScreenMode] = useState(false);
  const themeProviderRef = React.createRef();
  const searchSidebarRef = useRef(null);
  const closeSearch = () => setShowSearch(false);
  actOnClose(searchSidebarRef, closeSearch);

  return (
    <ThemeProvider ref={themeProviderRef} darkModeConfig={config.features.darkMode}>
      {config.header.enabled === true ? (
        <>
          <div
            css={{
              zIndex: 20,
              position: 'relative',
              display: showSearch || searchVisible ? 'block' : 'none',
            }}
          >
            <Slide right delay={0} duration={400} when={showSearch}>
              <SearchSidebar ref={searchSidebarRef} onVisibleChange={setSearchVisible} closeSelf={closeSearch} />
            </Slide>
          </div>
          <Header
            show={! (config.features.fullScreenMode.hideHeader && fullscreenMode)}
            location={location}
            setShowSearch={setShowSearch}
            themeProvider={themeProviderRef}
            toggleFullscreenMode={() => setFullScreenMode(!fullscreenMode)}
          />
        </>
      ) : (
        ''
      )}
      <MDXProvider components={MdxComponents}>
        {config.features.scrollTop === true ? <ScrollTop /> : ''}
        <Wrapper>
          {config.sidebar.enabled === true ? (
            <Sidebar show={! (config.features.fullScreenMode.hideSidebar && fullscreenMode)} location={location} css={hiddenMobile} />
          ) : (
            ''
          )}
          <MainContentWrapper>
            <MainContentScrollable>
              <Content>{children}</Content>
              <TableOfContents show={! (config.features.fullScreenMode.hideToc && fullscreenMode)} location={location} css={hiddenTablet} />
            </MainContentScrollable>
          </MainContentWrapper>
        </Wrapper>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
