import React from 'react';
import report from '../../../content/data/reporting.yml'

const ReportingComparisonTable = () => {

  return (
    <table>
      <thead>
        <tr>
          <th>Report name</th>
          <th>URL</th>
          <th>Export PDF</th>
          <th>Free</th>
          <th>Open source</th>
          <th>Report Designer Tool</th>
        </tr>
      </thead>
      <tbody>
        {report.reports.map((report, index) =>
          <tr key={`report_index_${index}`}>
            <td>{report.name}</td>
            <td><a href={report.url}>link</a></td>
            <td>{report.exportPDF ? 'yes' : 'no'}</td>
            <td>{report.free ? 'yes' : 'no'}</td>
            <td>{report.openSource ? 'yes' : 'no'}</td>
            <td>{report.designerTool}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

export default ReportingComparisonTable;
