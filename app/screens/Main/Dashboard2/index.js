import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

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

export default class Dashboard2 extends Component {
    static navigationOptions = {
        tabBarLabel: "Wykresy",
        tabBarIcon: () => <Icon size={24} name="chart" color="#CDD5DF" />
    }

    render() {
        return <View><Text>Movies & TV2</Text></View>
    }
}