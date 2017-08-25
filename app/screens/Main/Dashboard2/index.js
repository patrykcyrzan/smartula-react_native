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
        tabBarLabel: "Powiadomienia",
        tabBarIcon: () => <Icon size={24} name="bell" color="#CDD5DF" />
    }

    componentWillReceiveProps(newProps) {
        if (newProps.screenProps.navigation.route_index === 1) {
            //console.log("dash2");
            this.props.screenProps.actions.updateTabNav(this.props.navigation);
        }
    }

    render() {
        console.log("PROPS 2")
        console.log(this.props)
        console.log("--------")
        //console.log("dash2render")
        return <View><Text>Movies & TV2</Text></View>
    }
}