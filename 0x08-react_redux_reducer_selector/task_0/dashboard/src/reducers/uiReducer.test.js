import { initialState, uiReducer } from './uiReducer';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';

describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state when an unrelated action is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).toEqual(initialState);
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER', () => {
    expect(uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER })).toEqual(
      { ...initialState, isNotificationDrawerVisible: true }
    );
  });
});
