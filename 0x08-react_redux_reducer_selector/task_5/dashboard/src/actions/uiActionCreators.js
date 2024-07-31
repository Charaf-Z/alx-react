import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from './uiActionTypes';

export const login = (email, password) => ({
  type: LOGIN,
  user: { email, password },
});

export const logout = () => ({ type: LOGOUT });

export const displayNotificationDrawer = () => ({
  type: DISPLAY_NOTIFICATION_DRAWER,
});

export const hideNotificationDrawer = () => ({
  type: HIDE_NOTIFICATION_DRAWER,
});

export const boundLogin = (email, password) => dispatch(login(email, password));
export const boundLogout = () => dispatch(logout());
export const boundDisplayNotificationDrawer = () =>
  dispatch(displayNotificationDrawer());
export const boundHideNotificationDrawer = () =>
  dispatch(hideNotificationDrawer());

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginFailure = () => ({ type: LOGIN_FAILURE });
export const loginRequest = (email, password) => {
  return (dispatch) => {
    dispatch(login(email, password));
    return fetch('http://localhost:3000/login-success.json')
      .then((res) => res.json())
      .then((_json) => dispatch(loginSuccess()))
      .catch((_error) => dispatch(loginFailure()));
  };
};
