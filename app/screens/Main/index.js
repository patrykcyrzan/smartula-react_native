import React, { PropTypes } from 'react';
import {
    StatusBar,
    StyleSheet, View,
} from 'react-native';
import {DrawerNavigator} from "react-navigation";
import SlideMenu from "../../components/SlideMenu";

import MainScreen from './MainScreen'

const MainScreenDrawer = DrawerNavigator(
    {
        MainScreen: {
            path: '/index',
            screen: ({ navigation }) => <MainScreen screenProps={{ rootNavigation: navigation }} />
        },
    },
    {
        contentComponent: SlideMenu,
        drawerPosition: 'left',
        initialRouteName: 'MainScreen',
        contentOptions: {
            activeTintColor: '#e91e63'
        },
        style: {
            backgroundColor: '#202930'
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        width: 150,
    },
});

export default () => (
    <View style={{ flex: 1 }}>
        <StatusBar
            barStyle="light-content"
            backgroundColor={'#FFE066'} />
        <MainScreenDrawer/>
    </View>
)
