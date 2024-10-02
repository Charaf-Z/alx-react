import { fromJS } from 'immutable';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';

describe('Notification Selectors', () => {
  const state = fromJS({
    filter: 'DEFAULT',
    entities: {
      notifications: {
        1: {
          id: 1,
          isRead: false,
          type: 'default',
          value: 'New course available',
        },
        2: {
          id: 2,
          isRead: true,
          type: 'urgent',
          value: 'New resume available',
        },
        3: {
          id: 3,
          isRead: false,
          type: 'urgent',
          value: 'New data available',
        },
      },
    },
  });

  it('filterTypeSelected should return the filter type', () => {
    expect(filterTypeSelected(state)).toEqual('DEFAULT');
  });

  it('getNotifications should return all notifications', () => {
    expect(getNotifications(state).toJS()).toEqual({
      1: {
        id: 1,
        isRead: false,
        type: 'default',
        value: 'New course available',
      },
      2: { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
      3: { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
    });
  });

  it('getUnreadNotifications should return only unread notifications', () => {
    expect(getUnreadNotifications(state).toJS()).toEqual({
      1: {
        id: 1,
        isRead: false,
        type: 'default',
        value: 'New course available',
      },
      3: { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
    });
  });
});
