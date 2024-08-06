/**
 * @jest-environment jsdom
 */

import { StyleSheetTestUtils } from 'aphrodite';
import { shallow } from 'enzyme';
import React, { act } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { getLatestNotification } from '../utils/utils';
import App, { mapStatetoProps } from './App';
import { initialState } from '../reducers/uiReducer';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';

// const store = createStore(uiReducer, initialState);

const mockStore = configureStore([]);
const store = mockStore(initialState);

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
    const app = shallow(<App store={store} />);
    expect(app.exists()).toBe(true);
  });

  it('Render Notifications Component', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();

    expect(app.find('Notifications')).toHaveLength(1);
  });

  it('Render Header Component', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();
    expect(app.contains(<Header />)).toBe(true);
  });

  it('Render Login Component', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();
    console.log(app.debug());
    expect(app.find('Login')).toHaveLength(1);
  });

  it('Render Footer Component', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();
    expect(app.contains(<Footer />)).toBe(true);
  });

  it('Render CourseList Component', () => {
    const user = {
      email: 'mail@m.com',
      password: '123#kill',
      isLoggedIn: true,
    };
    const app = shallow(<App store={store} />)
      .dive()
      .dive();

    act(() => {
      app.instance().setState({ user });
    });
    app.update();
    expect(app.find('CourseList')).toHaveLength(1);
  });
});

describe('Ctrl + h', () => {
  it('LogOut is called', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();
    const instance = app.instance();
    const logOut = jest.spyOn(instance, 'logOut');
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(logOut).toHaveBeenCalled();
  });

  window.alert = jest.fn();
  it('Alert is called', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();
    const spy = jest.spyOn(window, 'alert');
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    app.unmount();
  });

  it('Alert message', () => {
    const app = shallow(<App store={store} />)
      .dive()
      .dive();
    const spy = jest.spyOn(window, 'alert');
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalledWith('Logging you out');
    jest.restoreAllMocks();
    app.unmount();
  });
  window.alert.mockClear();
});

// describe('Notifications Handlers', () => {
//   it('markNotificationAsRead is works', () => {
//     const context = {
//       user,
//       logOut: jest.fn(),
//       listNotifications,
//     };
//     const app = mount(
//       <Provider store={store}>
//         <AppContext.Provider value={context}>
//           <App />
//         </AppContext.Provider>
//       </Provider>
//     );
//     const instance = app.find('App').instance();
//     act(() => {
//       instance.markNotificationAsRead(3);
//     });
//     app.update();
//     expect(instance.state.listNotifications).toEqual(
//       listNotifications.filter((item) => item.id !== 3)
//     );
//     expect(instance.state.listNotifications.length).toBe(2);
//     expect(instance.state.listNotifications[3]).toBe(undefined);
//     app.unmount();
//   });
// });

describe('React redux connectors adn providers', () => {
  it('mapStateToProps return the right object', () => {
    let state = fromJS({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: true,
    });
    expect(mapStatetoProps(state)).toEqual({
      displayDrawer: true,
      isLoggedIn: true,
    });
  });
});
