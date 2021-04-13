// Fit for many comparison features but less products
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const Wrapper = styled.div`
  //overflow-x: auto;
`;

const comparisonTableStyle = theme => css`
  border-collapse: collapse;
  position: relative;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  * {
    box-sizing: border-box
  }

  th, td {
    padding: 12px 15px;
  }

  th {
    background-color: #CCC;
    min-width: 150px;
    position: sticky;
    top: 0;
    background-color: ${theme.table.header.background};
    color: ${theme.table.header.font};
  }

  tbody tr{
    &:nth-child(even) {
      background-color: ${theme.table.evenRow};
    }

    &:nth-child(odd) {
      background-color: ${theme.table.oddRow};
    }
    &:hover {
      background-color: ${theme.table.rowHover};
    }
  }

  @media screen and (max-width: 768px) {
    th, td {
      width: 50%;
    }

    th {
      display: inline-block;
    }

    tbody tr {
      display: flex;
      flex-flow: row wrap;
    }

    td {
      flex: auto; // Same as 1 1 auto.
    }

    th:first-child {
      display:none;
    }

    td:first-child {
      text-align: center;
      background: #efefef;
      width: 100%;
      font-weight: bold;
    }
  }
`;

// https://www.sitepoint.com/responsive-solutions-for-feature-comparison-tables/
const FeatureAsRowComparisonTable = ({ data }) => {
  const theme  = useTheme();
  return (
    <Wrapper>
      <table css={comparisonTableStyle(theme)}>
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

export default FeatureAsRowComparisonTable;
