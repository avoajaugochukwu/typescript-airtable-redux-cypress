import { combineReducers } from 'redux';
import studentReducer from './studentReducer';

const reducers = combineReducers({
  students: studentReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
