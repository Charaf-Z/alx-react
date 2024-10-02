import {
  markAsAread,
  setNotificationFilter,
} from './notificationActionCreators';
import {
  MARK_AS_READ,
  NotificationTypeFilters,
  SET_TYPE_FILTER,
} from './notificationActionTypes';

describe('Notificaton Action Creators', () => {
  it('Mark as Read Call', () => {
    expect(markAsAread(1)).toEqual({
      type: MARK_AS_READ,
      index: 1,
    });
  });

  it('Set Notificaton Filter Call', () => {
    expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'DEFAULT',
    });
  });
});
