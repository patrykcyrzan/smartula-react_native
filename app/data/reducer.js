import { combineReducers } from 'redux';
import { reducer as hivesReducer } from './hives/reducer';

export const reducer = combineReducers({
    hives: hivesReducer,
});