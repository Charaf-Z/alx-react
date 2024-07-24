/**
 * @jest-environment jsdom
 */

import React from 'react';
import Header from './Header';
import { mount, shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, user } from '../App/AppContext';

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

  it('Default logOut section', () => {
    const context = {
      user,
      logOut: jest.fn(),
    };
    const header = mount(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );
    expect(header.find('#logoutSection').length).toBe(0);
    expect(header.find('#logoutSection').exists()).toBe(false);
    header.unmount();
  });

  it('Non empty context', () => {
    const context = {
      user: {
        email: 'mail@m.com',
        password: '123#kill',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };
    const header = mount(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );
    expect(header.find('#logoutSection').length).toBe(1);
    expect(header.find('#logoutSection').exists()).toBe(true);
    header.unmount();
  });

  it('logOut call', () => {
    const context = {
      user: {
        email: 'mail@m.com',
        password: '123#kill',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };
    const spy = jest.spyOn(context, 'logOut');
    const header = mount(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );
    header.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    header.unmount();
  });
});
