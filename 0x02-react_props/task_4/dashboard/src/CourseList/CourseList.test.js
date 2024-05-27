import React from 'react';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('Course List Component', () => {
  it('without crashing', () => {
    const row = shallow(<CourseLIst />);
    expect(row.exists()).toBe(true);
  });

  it('renders 5 different rows', () => {
    const row = shallow(<CourseLIst />);

    expect(row.find('thead').children()).toHaveLength(2);
    row.find('thead').forEach((node) => {
      expect(node.equals(<CourseListRow textFirstCell="Foo" />));
    });

    expect(row.find('tbody').children()).toHaveLength(3);
    row.find('tbody').forEach((node) => {
      expect(node.equals(<CourseListRow textFirstCell="Foo" />));
    });
  });
});
