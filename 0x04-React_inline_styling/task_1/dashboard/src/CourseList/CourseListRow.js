import React from 'react';
import PropTypes from 'prop-types';

const rowStyle = {
  backgroundColor: '#f5f5f5ab',
};

const headRowStyle = {
  backgroundColor: '#deb5b545',
};

export default function CourseListRow({
  isHeader,
  textFirstCell,
  textSecondCell,
}) {
  return (
    <tr style={rowStyle}>
      {isHeader &&
        (!textSecondCell ? (
          <th style={headRowStyle} colSpan={2}>
            {textFirstCell}
          </th>
        ) : (
          <>
            <th style={headRowStyle}>{textFirstCell}</th>
            <th style={headRowStyle}>{textSecondCell}</th>
          </>
        ))}
      {!isHeader && (
        <>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
