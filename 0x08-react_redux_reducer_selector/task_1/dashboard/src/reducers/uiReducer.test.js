import { initialState, uiReducer } from './uiReducer';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { Map } from 'immutable';

describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when an unrelated action is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE }).toJS()).toEqual(
      initialState.toJS()
    );
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER', () => {
    const stateAfterAction = Map({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: {},
    });
    expect(
      uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER }).toJS()
    ).toEqual(stateAfterAction.toJS());
  });
});
