import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login,
  logout,
} from './uiActionCreators';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
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
