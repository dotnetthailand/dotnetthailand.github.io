import { useStaticQuery, graphql } from 'gatsby';
// https://www.gatsbyjs.cn/docs/use-static-query/#composing-custom-usestaticquery-hooks
const reportData = () => {
  const { allReportingYaml } = useStaticQuery(graphql`
    query MyQuery {
      allReportingYaml {
        nodes {
          name
          openSource
          designerTool
          exportPDF
          free
          url
        }
      }
    }
  `);

  return allReportingYaml.nodes;
};

export { reportData };
