import { createSelector } from 'reselect';

export const filterTypeSelected = (state) => state.get('filter');
export const getNotifications = (state) =>
  state.get('entities').get('notifications');
export const getUnreadNotifications = createSelector(
  [getNotifications],
  (Notification) => Notification.filter((notif) => !notif.get('isRead'))
);
