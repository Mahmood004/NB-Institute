import { combineReducers } from 'redux';
import authUserReducer from './authUserReducer';
import coursesListReducer from './coursesListReducer';

export default combineReducers({
  authUser: authUserReducer,
  coursesList: coursesListReducer
})