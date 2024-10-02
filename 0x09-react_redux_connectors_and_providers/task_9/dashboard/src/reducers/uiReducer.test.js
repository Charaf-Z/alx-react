import { initialUiState, uiReducer } from './uiReducer';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { DISPLAY_NOTIFICATION_DRAWER, LOGIN } from '../actions/uiActionTypes';
import { Map } from 'immutable';

describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialUiState.toJS());
  });

  it('should return the initial state when an unrelated action is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE }).toJS()).toEqual(
      initialUiState.toJS()
    );
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER', () => {
    const stateAfterAction = Map({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: null,
    });
    expect(
      uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER }).toJS()
    ).toEqual(stateAfterAction.toJS());
  });

  it('should handle LOGIN', () => {
    const connectedUser = { email: 'mail@home.com', password: '159#kill' };
    const stateAfterAction = Map({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: connectedUser,
    });
    expect(
      uiReducer(undefined, { type: LOGIN, user: connectedUser }).toJS()
    ).toEqual(stateAfterAction.toJS());
  });
});
