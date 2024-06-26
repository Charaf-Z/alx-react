import React from 'react';
import PropTypes from 'prop-types';

export default function CourseListRow({
  isHeader,
  textFirstCell,
  textSecondCell,
}) {
  const rowStyle = {
    backgroundColor: '#f5f5f5ab',
  };

  const headRowStyle = {
    backgroundColor: '#deb5b545',
  };
  const endStyle = isHeader ? headRowStyle : rowStyle;
  return (
    <tr style={endStyle}>
      {isHeader &&
        (!textSecondCell ? (
          <th colSpan={2}>{textFirstCell}</th>
        ) : (
          <>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
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
