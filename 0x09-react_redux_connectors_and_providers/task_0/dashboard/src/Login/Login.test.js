/**
 * @jest-environment jsdom
 */

import { StyleSheetTestUtils } from 'aphrodite';
import { mount, shallow } from 'enzyme';
import React from 'react';
import Login from './Login';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Login Component', () => {
  it('Without Crashing', () => {
    const login = shallow(<Login />);
    expect(login.exists()).toBe(true);
  });

  it('Inputs and Labels', () => {
    const login = shallow(<Login />);
    expect(login.find('label')).toHaveLength(2);
    expect(login.find('input')).toHaveLength(3);
  });

  it('Disabled Submit', () => {
    const login = shallow(<Login />);
    expect(login.find('input[type="submit"]').props().disabled).toBe(true);
  });

  it('Enable Submit', () => {
    const login = mount(<Login />);
    login
      .find('#email')
      .simulate('change', { target: { value: 'mail@m.com' } });
    login
      .find('#password')
      .simulate('change', { target: { value: '123#kill' } });
    expect(login.find('input[type="submit"]').props().disabled).toBe(false);
  });
});
