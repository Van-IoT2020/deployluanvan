import { combineReducers } from 'redux';
import numberCartReducer from './numberCart';

const allReducers = combineReducers({
    numberCartReducer: numberCartReducer,
});

export default allReducers;