import React from 'react';
import report from '../../../content/data/reporting.yml'

const ReportingComparisonTable = () => {

  return (
    <table className='comparison-table'>
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
        {report.reports.map((report, index) =>
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
    </table>
  )
};

export default ReportingComparisonTable;
