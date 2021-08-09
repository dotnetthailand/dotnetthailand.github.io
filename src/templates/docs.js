import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import { Layout, EditOnRepo, PreviousNext, Seo, FacebookComment, PageMetadata } from '../components';
import config from 'config';
import emoji from '../utils/emoji';
import { onMobile, onTablet, isMobile } from '../styles/responsive';

const Title = styled.h1`
  font-size: 24pt
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid ${(props) => props.theme.colors.primary};
  padding: 0 16px;
  flex: 1;
  margin-top: 0;
  ${onTablet} {
    font-size: 22pt;
  }
  ${onMobile} {
    font-size: 20pt;
  }
`;

const PageTitle = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid ${(props) => props.theme.content.border};
  color: ${(props) => props.theme.content.titleFont};
  ${onMobile} {
    padding: 15px;
    margin-bottom: 0;
  }
`;

const TitleWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const ContentWrapper = styled.div`
  color: ${(props) => props.theme.content.font};
  flex: 1;
  code {
    background: ${(props) => props.theme.content.code.background};
    border: 1px solid ${(props) => props.theme.content.code.border};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9375em;
    color: ${(props) => props.theme.content.code.font};
    // overflow-wrap: break-word;
  }
  section {
    margin: 24px 0;
  }
  ul,
  ol {
    -webkit-padding-start: 40px;
    -moz-padding-start: 40px;
    -o-padding-start: 40px;
    margin: 12px 0px;
    padding: 0px 0px 0px 2em;
  }

  ul li,
  ol li {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
  }
`;

export default class MDXRuntimeTest extends React.Component {
  componentDidMount() {
    if (window.location.hash) {
      const element = document.getElementById(decodeURI(window.location.hash.substring(1)));
      element?.scrollIntoView(true);
    }
  }

  render() {
    // The data prop contains the results of the page GraphQL query.
    // https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/#use-the-query-result-in-the-homepage--component
    const { data } = this.props;
    if (!data) {
      return null;
    }

    const {
      mdx,
      site: {
        siteMetadata: { docsLocation, docsLocationType, editable, docsRepo, contentRootPath, siteUrl },
      },
      gitBranch,
    } = data;

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;
    const docTitle = emoji.emojify(mdx.fields.title);
    const headTitle = metaTitle ? metaTitle : emoji.clean(docTitle);

    // Get full URL of the current page at build time.
    // https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/#method-3-generate-the-current-page-url-with-the-pathname-property-from-location-data
    const absolutePageUrl = `${siteUrl}${this.props.location.pathname}`;
    return (
      <Layout {...this.props}>
        <Seo frontmatter={mdx.frontmatter} url={absolutePageUrl} title={headTitle} />
        <PageTitle>
          <TitleWrapper>
            <Title>{docTitle}</Title>
            {!isMobile() && docsLocation && contentRootPath && ((editable && mdx.frontmatter.editable !== false) || mdx.frontmatter.editable === true) ? (
              <EditOnRepo
                location={docsLocation}
                branch={gitBranch.name}
                path={mdx.parent.relativePath}
                repoType={docsLocationType}
                contentRootPath={contentRootPath}
              />
            ) : (
              ''
            )}
          </TitleWrapper>
          {(config.features.showMetadata === true && mdx.frontmatter.showMetadata !== false) ||
            mdx.frontmatter.showMetadata === true ? (
            <div css={{ display: 'block' }}>
              {mdx.parent.relativePath && docsRepo && docsLocationType && contentRootPath &&
                <PageMetadata
                  path={mdx.parent.relativePath}
                  repo={docsRepo}
                  repoType={docsLocationType}
                  contentRootPath={contentRootPath}
                  locationPathname={this.props.location.pathname}
                  timeToRead={mdx.timeToRead * 2}
                />}
            </div>
          ) : (
            ''
          )}
        </PageTitle>
        <ContentWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </ContentWrapper>
        {(config.features.previousNext.enabled === true &&
          mdx.frontmatter.showPreviousNext !== false) ||
          mdx.frontmatter.showPreviousNext ? (
          <div css={{ padding: '30px 0' }}>
            <PreviousNext mdx={mdx} />
          </div>
        ) : (
          ''
        )}
        <FacebookComment url={absolutePageUrl} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
        docsRepo
        docsLocationType
        editable
        contentRootPath
        siteUrl
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      timeToRead
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        showMetadata
        editable
        showPreviousNext
        showToc
      }
    }
    gitBranch {
      name
    }
    gitCommit(latest: { eq: true }) {
      hash
      date(formatString: "YYYY-MM-DD hh:mm")
    }
  }
`;
