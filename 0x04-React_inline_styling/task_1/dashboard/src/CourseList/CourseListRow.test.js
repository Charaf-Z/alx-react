import React from 'react';
import CourseListRow from './CourseListRow';
import { shallow } from 'enzyme';

describe('Course List Row Component', () => {
  it('without crashing', () => {
    const row = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    expect(row.exists()).toBe(true);
  });

  it('One head to the table', () => {
    const row = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);

    expect(row.find('tr').children()).toHaveLength(1);
    expect(row.find('tr').childAt(0).html()).toEqual(
      '<th style="background-color:#deb5b545" colSpan="2">test</th>'
    );
  });

  it('Two head to the table', () => {
    const row = shallow(
      <CourseListRow
        isHeader={true}
        textFirstCell="test1"
        textSecondCell="test2"
      />
    );

    expect(row.find('tr').children()).toHaveLength(2);
    expect(row.find('tr').childAt(0).html()).toEqual(
      '<th style="background-color:#deb5b545">test1</th>'
    );
    expect(row.find('tr').childAt(1).html()).toEqual(
      '<th style="background-color:#deb5b545">test2</th>'
    );
  });

  it('The body of the table', () => {
    const row = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="test1"
        textSecondCell="test2"
      />
    );

    expect(row.find('tr').children()).toHaveLength(2);
    expect(row.find('tr').childAt(0).html()).toEqual('<td>test1</td>');
    expect(row.find('tr').childAt(1).html()).toEqual('<td>test2</td>');
  });
});
