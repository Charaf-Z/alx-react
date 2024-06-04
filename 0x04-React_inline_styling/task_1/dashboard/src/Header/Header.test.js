import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header Component', () => {
  it('Without Crashing', () => {
    const header = shallow(<Header />);
    expect(header.exists()).toBe(true);
  });

  it('Render img and h1', () => {
    const header = shallow(<Header />);
    expect(header.exists('img')).toBe(true);
    expect(header.containsMatchingElement(<h1>School dashboard</h1>)).toBe(
      true
    );
  });
});
