import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet, Text, View,
} from 'react-native';

export default class AboutScreen extends Component {

    static navigationOptions = {
        title: "About screen 2sdf"
    }

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Text>ASDdasd</Text>
            </View>
        )
    }
}