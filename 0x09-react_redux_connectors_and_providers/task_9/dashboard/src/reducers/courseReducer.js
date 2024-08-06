import { fromJS } from 'immutable';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

export const initialCoursesState = fromJS({
  entities: {},
  ids: [],
});

export const courseReducer = (state = initialCoursesState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      const { entities, result } = coursesNormalizer(action.data);
      return state.merge({ entities: fromJS(entities.courses), ids: result });
    case SELECT_COURSE:
    case UNSELECT_COURSE:
      return state.setIn(
        ['entities', String(action.index), 'isSelected'],
        action.type === SELECT_COURSE
      );
    default:
      return state;
  }
};
