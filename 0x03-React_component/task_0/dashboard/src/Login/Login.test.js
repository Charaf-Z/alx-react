import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';

describe('Login Component', () => {
  it('Without Crashing', () => {
    const login = shallow(<Login />);
    expect(login.exists()).toBe(true);
  });

  it('Inputs and Labels', () => {
    const login = shallow(<Login />);
    expect(login.find('label')).toHaveLength(2);
    expect(login.find('input')).toHaveLength(2);
  });
});
