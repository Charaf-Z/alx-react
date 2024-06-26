import { thunk } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login,
  loginRequest,
  logout,
} from './uiActionCreators';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from './uiActionTypes';

describe('UI Action Creators', () => {
  it('Login Call', () => {
    const user = { email: 'mail@m.com', password: '123#hide' };
    const action = { type: LOGIN, user };
    expect(login(user.email, user.password)).toEqual(action);
  });

  it('Logout Call', () => {
    const action = { type: LOGOUT };
    expect(logout()).toEqual(action);
  });

  it('Display Notification Drawer Call', () => {
    expect(displayNotificationDrawer()).toEqual({
      type: DISPLAY_NOTIFICATION_DRAWER,
    });
  });

  it('Hide Notificaion Drawer Call', () => {
    expect(hideNotificationDrawer()).toEqual({
      type: HIDE_NOTIFICATION_DRAWER,
    });
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginRequest actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches LOGIN and LOGIN_SUCCESS on successful login', () => {
    fetchMock.getOnce('http://localhost:3000/login-success.json', {
      body: { data: 'login successful' },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: LOGIN,
        user: { email: 'test@example.com', password: 'password' },
      },
      { type: LOGIN_SUCCESS },
    ];
    const store = mockStore({});

    return store
      .dispatch(loginRequest('test@example.com', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches LOGIN and LOGIN_FAILURE on failed login', () => {
    fetchMock.getOnce('http://localhost:3000/login-success.json', 404);

    const expectedActions = [
      {
        type: LOGIN,
        user: { email: 'test@example.com', password: 'password' },
      },
      { type: LOGIN_FAILURE },
    ];
    const store = mockStore({});

    return store
      .dispatch(loginRequest('test@example.com', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
