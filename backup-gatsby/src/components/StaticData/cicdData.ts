import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.cn/docs/use-static-query/#composing-custom-usestaticquery-hooks
const cicdData = () => {
  const { allCiCdYaml } = useStaticQuery(graphql`
    query queryCICD {
      allCiCdYaml {
        nodes {
          id
          actions
          feature
          pipelines
        }
      }
    }
  `);

  return allCiCdYaml.nodes;
};

export default cicdData;
