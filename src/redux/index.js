import { combineReducers } from 'redux';
import singleEmployee from './singleEmployee';

const appReducer = combineReducers({
  singleEmployee: singleEmployee,
});

export default appReducer;
