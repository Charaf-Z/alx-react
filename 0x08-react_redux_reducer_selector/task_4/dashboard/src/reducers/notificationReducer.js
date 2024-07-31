import { fromJS } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  NotificationTypeFilters,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';
import {
  normalizedData,
  notificationsNormalizer,
} from '../schema/notifications';

export const initialState = fromJS({
  entities: normalizedData.entities.notifications,
  ids: normalizedData.result,
  filter: NotificationTypeFilters.DEFAULT,
});

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const { entities, result } = notificationsNormalizer(action.data);
      return state.mergeDeep({
        entities: fromJS(entities.notifications),
        ids: result,
      });
    case MARK_AS_READ:
      return state.updateIn(
        ['entities', String(action.index), 'isRead'],
        () => true
      );
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    default:
      return state;
  }
};
