import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow({
  isHeader,
  textFirstCell,
  textSecondCell,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChangeCheck = (_event) => setIsChecked(!isChecked);
  const rowStyle = isChecked
    ? css(styles.rowChecked)
    : isHeader
      ? css(styles.header)
      : css(styles.default);
  return (
    <tr className={rowStyle}>
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
          <td>
            <input type="checkbox" onChange={handleChangeCheck} />
            {textFirstCell}
          </td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#deb5b545',
  },
  default: {
    backgroundColor: '#f5f5f5ab',
  },
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
});

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
