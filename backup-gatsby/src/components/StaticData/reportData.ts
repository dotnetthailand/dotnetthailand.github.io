import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.cn/docs/use-static-query/#composing-custom-usestaticquery-hooks
const reportData = () => {
  const { allReportingYaml } = useStaticQuery(graphql`
    query queryReportYAML {
      allReportingYaml {
        nodes {
          id
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

export default reportData;
