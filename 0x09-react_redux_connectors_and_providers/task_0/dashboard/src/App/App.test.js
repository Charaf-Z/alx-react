/**
 * @jest-environment jsdom
 */

import { StyleSheetTestUtils } from 'aphrodite';
import { mount, shallow } from 'enzyme';
import React, { act } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { getLatestNotification } from '../utils/utils';
import App, { mapStatetoProps } from './App';
import { AppContext, user } from './AppContext';
import { createStore } from 'redux';
import { initialState, uiReducer } from '../reducers/uiReducer';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

const store = createStore(uiReducer, initialState);

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
];

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('App Componenet', function () {
  it('Without Crashing', function () {
    const app = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.exists()).toBe(true);
  });

  it('Render Notifications Component', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.find('Notifications')).toHaveLength(1);
  });

  it('Render Header Component', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.contains(<Header />)).toBe(true);
  });

  it('Render Login Component', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.find('Login')).toHaveLength(1);
  });

  it('Render Footer Component', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.contains(<Footer />)).toBe(true);
  });

  it('Render CourseList Component', () => {
    const user = {
      email: 'mail@m.com',
      password: '123#kill',
      isLoggedIn: true,
    };
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    act(() => {
      app.find('App').instance().setState({ user });
    });
    app.update();
    expect(app.find('CourseList')).toHaveLength(1);
  });
});

describe('Ctrl + h', () => {
  it('LogOut is called', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const instance = app.find('App').instance();
    const logOut = jest.spyOn(instance, 'logOut');
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(logOut).toHaveBeenCalled();
  });

  window.alert = jest.fn();
  it('Alert is called', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const spy = jest.spyOn(window, 'alert');
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    app.unmount();
  });

  it('Alert message', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const spy = jest.spyOn(window, 'alert');
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalledWith('Logging you out');
    jest.restoreAllMocks();
    app.unmount();
  });
  window.alert.mockClear();
});

describe('State Handling', () => {
  it('Default state value', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.find('App').instance().state.displayDrawer).toBe(false);
  });

  it('Change the displayDrawer to true', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const instance = app.find('App').instance();
    expect(instance.state.displayDrawer).toBe(false);
    act(() => {
      instance.handleDisplayDrawer();
    });
    app.update();
    expect(instance.state.displayDrawer).toBe(true);
  });

  it('Change the displayDrawer to false', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const instance = app.find('App').instance();
    expect(instance.state.displayDrawer).toBe(false);
    act(() => {
      instance.handleDisplayDrawer();
    });
    app.update();
    expect(instance.state.displayDrawer).toBe(true);
    act(() => {
      instance.handleHideDrawer();
    });
    app.update();
    expect(instance.state.displayDrawer).toBe(false);
  });

  it('Update user state', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const newUser = {
      email: 'mail@m.com',
      password: '123#kill',
      isLoggedIn: true,
    };
    const instance = app.find('App').instance();
    expect(instance.state.user).toEqual(user);
    act(() => {
      instance.logIn(newUser.email, newUser.password);
    });
    app.update();
    expect(instance.state.user).toEqual(newUser);
  });

  it('Calling the logOut', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const newUser = {
      email: 'mail@m.com',
      password: '123#kill',
      isLoggedIn: true,
    };

    const instance = app.find('App').instance();
    expect(instance.state.user).toEqual(user);
    act(() => {
      instance.logIn(newUser.email, newUser.password);
    });
    app.update();
    expect(instance.state.user).toEqual(newUser);
    act(() => {
      instance.logOut();
    });
    app.update();
    expect(instance.state.user).toEqual(user);
  });
});

describe('Notifications Handlers', () => {
  it('markNotificationAsRead is works', () => {
    const context = {
      user,
      logOut: jest.fn(),
      listNotifications,
    };
    const app = mount(
      <Provider store={store}>
        <AppContext.Provider value={context}>
          <App />
        </AppContext.Provider>
      </Provider>
    );
    const instance = app.find('App').instance();
    act(() => {
      instance.markNotificationAsRead(3);
    });
    app.update();
    expect(instance.state.listNotifications).toEqual(
      listNotifications.filter((item) => item.id !== 3)
    );
    expect(instance.state.listNotifications.length).toBe(2);
    expect(instance.state.listNotifications[3]).toBe(undefined);
    app.unmount();
  });
});

describe('React redux connectors adn providers', () => {
  it('mapStateToProps return the right object from user Login', () => {
    let state = fromJS({
      isUserLoggedIn: true,
    });
    expect(mapStatetoProps(state)).toEqual({ isLoggedIn: true });
  });
});
