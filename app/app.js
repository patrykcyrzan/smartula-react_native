/**
 * Created by Patryk on 01.07.2017.
 */
/*import React from 'react'

import {
    View,
    StatusBar
} from 'react-native'

import {
    StackNavigator,
    DrawerNavigator
} from 'react-navigation'

import LoginScreen      from './screens/Login/index'
import SlideMenu        from './components/slideMenu'

const MainScreen = DrawerNavigator(
    {
        Login: {
            path: '/Login',
            screen: LoginScreen
        }
    },
    {
        contentComponent: SlideMenu,
        drawerPosition: 'left',
        initialRouteName: 'Login',
        contentOptions: {
            activeTintColor: '#e91e63'
        },
        style: {
            backgroundColor: '#202930'
        }
    }
)

const MainRoutes = {
    MainScreen: {
        name: 'MainScreen',
        screen: MainScreen
    }
}

const AppNavigator = StackNavigator(
    {
        ...MainRoutes,
        Index: {
            screen: MainScreen
        }
    },
    {
        initialRouteName: 'Index',
        headerMode: 'none',

        /!*
         * Use modal on iOS because the card mode comes from the right,
         * which conflicts with the drawer example gesture
         *!/
        mode: 'card'
    }
)

export default () => (
    <View style={{ flex: 1 }}>
        <StatusBar
            barStyle="light-content"
            backgroundColor={'#202930'} />
        <AppNavigator />
    </View>
)*/
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation'
import { Provider } from 'react-redux';

import store from './store'

import Main from './screens/Main';
import Login from './screens/Main/Login';
import {initialState} from "./services/session/reducer";

const _XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

XMLHttpRequest = _XHR;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
});

const routesConfig = {
    //Splash:{screen:SplashScreen},
    Login: { screen: Login },
    Main: {
        screen: Main,
        navigationOptions: {
            title: 'Main',
        }
    },
};

/*const routeStack = [
    { name: 'Main', component: Main },
    { name: 'Login', component: Login },
];*/


const AppNavigator = StackNavigator(
    routesConfig,
    {
        headerMode: 'none',

        /*
         * Use modal on iOS because the card mode comes from the right,
         * which conflicts with the drawer example gesture
         */
        mode: 'card'
    }
)

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialRoute: null,
        };
    }

    componentDidMount() {
        // Waits for the redux store to be populated with the previously saved state,
        // then it will try to auto-login the user.

        /*const unsubscribe = store.subscribe(() => {
            if (store.getState().services.persist.isHydrated) {
                unsubscribe();
                this.autoLogin();
            }
        });*/
        this.setState({ initialRoute: routesConfig[0] });
    }

    renderContent() {
        /*if (!this.state.initialRoute) {
            return <Splash />;
        }*/

        return (
            <AppNavigator
                initialRoute={this.state.initialRoute}
                initialRouteStack={routesConfig}
                //onWillFocus={route => store.dispatch(routeHistoryActions.push(route))}
                renderScene={(route, navigation) =>
                    <route.component route={route} navigator={navigation} {...route.passProps} />
                }
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    {this.renderContent()}
                </Provider>
            </View>
        );
    }
}

export default App;

