import { fromJS } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  NotificationTypeFilters,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';
import { initialState, notificationReducer } from './notificationReducer';

describe('Notification Reducer', () => {
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' },
      ],
    };
    const normalizedData = notificationsNormalizer(action.data);
    const expectedState = initialState.mergeDeep({
      entities: fromJS(normalizedData.entities.notifications),
      ids: normalizedData.result,
    });
    expect(notificationReducer(undefined, action).toJS()).toEqual(
      expectedState.toJS()
    );
  });

  it('should handle MARK_AS_READ', () => {
    const normalizedInitialState = notificationsNormalizer({
      notifications: [
        {
          id: 1,
          isRead: false,
          type: 'default',
          value: 'New course available',
        },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      ],
    });
    const initialStateWithNotifications = initialState.mergeDeep({
      entities: fromJS(normalizedInitialState.entities.notifications),
      ids: normalizedInitialState.result,
    });
    const action = { type: MARK_AS_READ, index: 2 };
    const newState = notificationReducer(initialStateWithNotifications, action);
    expect(newState.getIn(['entities', '2', 'isRead'])).toBe(true);
  });

  it('should handle SET_TYPE_FILTER', () => {
    const action = {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    };
    const newState = notificationReducer(initialState, action);
    expect(newState.get('filter')).toEqual(NotificationTypeFilters.URGENT);
  });
});
