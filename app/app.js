/**
 * Created by Patryk on 01.07.2017.
 */
import React from 'react'

import {
    View,
    StatusBar
} from 'react-native'

import {
    StackNavigator,
    DrawerNavigator
} from 'react-navigation'

import LoginScreen      from './screens/login/index'
import SlideMenu        from './components/slideMenu'

const MainScreen = DrawerNavigator(
    {
        Login: {
            path: '/login',
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

        /*
         * Use modal on iOS because the card mode comes from the right,
         * which conflicts with the drawer example gesture
         */
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
)

