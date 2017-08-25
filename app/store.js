import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { composeWithDevTools } from 'remote-redux-devtools';

//import { reducer as dataReducer } from './data/reducer';
import { reducer as servicesReducer } from './services/reducer';
import events from './reducers/header';
import navigation from './reducers/headerNav'
//import * as persistActionCreators from './services/persist/actions';

const appReducer = combineReducers({
    services: servicesReducer,
    header: events,
    headerNav: navigation,
    //data: dataReducer,
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeWithDevTools(
    applyMiddleware(
        thunk,
    )
);

const store = createStore(
    appReducer,
    enhancer,
    autoRehydrate(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const saveAndLoadSessionFilter = createFilter(
    'services',
    ['session'],
    ['session']
);

/*export const persist = persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['data'],
    transforms: [saveAndLoadSessionFilter],
}, () => store.dispatch(persistActionCreators.update({ isHydrated: true })));*/

export default store;