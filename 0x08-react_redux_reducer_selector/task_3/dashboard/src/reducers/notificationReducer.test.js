import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  NotificationTypeFilters,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';
import { notificationReducer } from './notificationReducer';

describe('Notification Reducer', () => {
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [],
    });
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
    expect(notificationReducer(undefined, action)).toEqual({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        {
          id: 1,
          isRead: false,
          type: 'default',
          value: 'New course available',
        },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
      ],
    });
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        {
          id: 1,
          isRead: false,
          type: 'default',
          value: 'New course available',
        },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      ],
    };
    const action = { type: MARK_AS_READ, index: 2 };
    expect(notificationReducer(initialState, action)).toEqual({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        {
          id: 1,
          isRead: false,
          type: 'default',
          value: 'New course available',
        },
        { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
      ],
    });
  });

  it('should handle SET_TYPE_FILTER', () => {
    const initialState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [],
    };
    const action = {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    };
    expect(notificationReducer(initialState, action)).toEqual({
      filter: NotificationTypeFilters.URGENT,
      notifications: [],
    });
  });
});
