import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  overflow-x: auto;
  `;

const ComparisonTable = styled.div`
  // Use of RS CSS naming convention
  // We can't use display block because it make tr not fit 100% https://stackoverflow.com/a/36606652/1872200
  width: 100%;

  th {
    text-align: center;
    white-space: nowrap;
  }

  td,
  th {
    padding: 5px;
    min-width: 100px;
  }

  @media only screen and (max-width: 576px) {
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      margin: 10px;
      border: 1px solid #fff;
    }

    td {
      white-space: pre-wrap;
      display: flex;
    }

    td:before {
      content: attr(data-column);
      flex-basis: 170px;
      flex-shrink: 0;
      text-align: left;
    }
  }
`;

const FeatureAsColumnComparisonTable = ({ data }) => {
  return (
    <Wrapper>
      <ComparisonTable>
        <thead>
          <tr>
            <th>Report name</th>
            <th>URL</th>
            <th>Export PDF</th>
            <th>Free</th>
            <th>Open source</th>
            <th>Report designer tool</th>
          </tr>
        </thead>
        <tbody>
          {data.map((report, index) =>
            <tr key={`report_index_${index}`}>
              <td data-column='Report name' className='_no-wrap'>{report.name}</td>
              <td data-column='URL' className='_center'>
                <a href={report.url} >link</a>
              </td>
              <td data-column='Export PDF' className='_center'>
                {report.exportPDF ? 'yes' : 'no'}
              </td>
              <td data-column='Free' className='_center'>{report.free ? 'yes' : 'no'}</td>
              <td data-column='Open source' className='_center'>{report.openSource ? 'yes' : 'no'}</td>
              <td data-column='Report designer tool'>{report.designerTool}</td>
            </tr>
          )}
        </tbody>
      </ComparisonTable>
    </Wrapper>
  )
};

export default FeatureAsColumnComparisonTable;
