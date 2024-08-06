import { fromJS } from 'immutable';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import { courseReducer, initialState } from './courseReducer';
import { coursesNormalizer } from '../schema/courses';

describe('Course Reducer', () => {
  it('should return the initial state', () => {
    expect(courseReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COURSE_SUCCESS', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    };
    const normalizedData = coursesNormalizer(action.data);
    const expectedState = fromJS({
      entities: fromJS(normalizedData.entities.courses),
      ids: normalizedData.result,
    });
    expect(courseReducer(undefined, action).toJS()).toEqual(
      expectedState.toJS()
    );
  });

  it('should handle SELECT_COURSE', () => {
    const normalizedInitialState = coursesNormalizer([
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 },
    ]);
    const initialState = fromJS({
      entities: fromJS(normalizedInitialState.entities.courses),
      ids: normalizedInitialState.result,
    });
    const action = { type: SELECT_COURSE, index: 2 };
    const newState = courseReducer(initialState, action);
    expect(newState.getIn(['entities', '2', 'isSelected'])).toBe(true);
  });

  it('should handle UNSELECT_COURSE', () => {
    const normalizedInitialState = coursesNormalizer([
      { id: 1, name: 'ES6', isSelected: false, credit: 60 },
      { id: 2, name: 'Webpack', isSelected: true, credit: 20 },
      { id: 3, name: 'React', isSelected: false, credit: 40 },
    ]);
    const initialState = fromJS({
      entities: fromJS(normalizedInitialState.entities.courses),
      ids: normalizedInitialState.result,
    });
    const action = { type: UNSELECT_COURSE, index: 2 };
    const newState = courseReducer(initialState, action);
    expect(newState.getIn(['entities', '2', 'isSelected'])).toBe(false);
  });
});
