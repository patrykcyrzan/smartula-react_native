import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    Platform,
    StatusBar,
    Dimensions, Text, ScrollView
} from 'react-native'
import ScalableText from "react-native-text";
import HiveDetailContent from "./HiveDetailContent";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export default class HiveDetail extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'transparent'}
                    translucent={true}/>
                <View style={styles.container}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Image
                            style={[styles.hiveContainer, {alignSelf: 'center'}]}
                            source={{uri: 'http://www.protecttheplanet.co.uk/user/products/large/beehive-wooden-composter.jpg'}}/>
                        <View style={{flex: 0.6}}>
                        <ScrollView>
                            <HiveDetailContent />
                        </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={styles.bordered}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    hiveContainer: {
        flex: 0.5,
        //height: viewportHeight * 0.5,
        width: viewportWidth * 0.5,

    },
    bordered: {
        flex: 0,
        borderBottomWidth: 1,
        borderColor: '#EBECED'
    },
    content: {
        paddingTop: Platform.OS === 'ios' ? 20 : 24,
        backgroundColor: 'transparent',
        flex: 1
    },
    btn: {
        height: 60,
        width: 60,
        marginBottom: Platform.OS === 'ios' ? 17 : 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLeft: {
        height: 40,
        width: 40
    },
    headerTitle: {
        flex: 1,
    },
    headerTxt: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Raleway-SemiBold',
        flexDirection: 'row',
        textAlign: 'center'
    },
    subHeaderTxt: {
        color: '#fff',
        fontSize: 14,
        marginTop: 2,
        fontFamily: 'Raleway-Medium',
        flexDirection: 'row',
        textAlign: 'center'
    }
})