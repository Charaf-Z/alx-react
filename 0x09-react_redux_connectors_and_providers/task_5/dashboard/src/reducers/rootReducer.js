import { courseReducer, initialCoursesState } from './courseReducer';
import {
  initialNotificationsState,
  notificationReducer,
} from './notificationReducer';
import { initialUiState, uiReducer } from './uiReducer';
import { combineReducers } from 'redux';

export const initialState = {
  courses: initialCoursesState,
  notifications: initialNotificationsState,
  ui: initialUiState,
};

export const rooteReducer = combineReducers({
  courses: courseReducer,
  notifications: notificationReducer,
  ui: uiReducer,
});
