// Fit for many comparison features but less products
import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

// https://www.sitepoint.com/responsive-solutions-for-feature-comparison-tables/
const FeatureAsColumnComparisonTable = ({ data }) => {
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>GitHub Actions</th>
            <th>Azure DevOps Pipelines</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            <tr key={item.id}>
              <td data-column={item.feature}>{item.feature}</td>
              <td data-column='Github Actions'>{item.actions}</td>
              <td data-column='Azure DevOps Pipeline'>{item.pipelines}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Wrapper>
  )
};

export default FeatureAsColumnComparisonTable;
