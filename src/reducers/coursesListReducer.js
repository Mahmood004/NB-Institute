import { COURSES_LIST } from '../actions/types';

export default function (state = [], action) {
  switch(action.type) {
    case COURSES_LIST:
      return action.payload || false;
    default:
      return state;
  }
}