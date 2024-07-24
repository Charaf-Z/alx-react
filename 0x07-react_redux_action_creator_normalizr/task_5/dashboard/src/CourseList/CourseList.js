import React from 'react';
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import { CourseShape } from './CourseShape';
import { StyleSheet, css } from 'aphrodite';

export default function CourseList({ listCourses }) {
  return (
    <table id="CourseList" className={css(styles.table)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow
          textFirstCell="Course name"
          textSecondCell="Credit"
          isHeader={true}
        />
      </thead>
      <tbody>
        {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit }) => (
            <CourseListRow
              key={id}
              textFirstCell={name}
              textSecondCell={credit}
            />
          ))
        ) : (
          <CourseListRow textFirstCell="No course available yet" />
        )}
      </tbody>
    </table>
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '8px',
    border: '1px solid #ccc',
  },
  td: {
    padding: '8px',
    border: '1px solid #ccc',
    textAlign: 'left',
  },
  tr: {
    ':nth-child(2)': {
      textAlign: 'left',
    },
  },
});

CourseList.defaultProps = {
  listCourses: [],
};

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};
