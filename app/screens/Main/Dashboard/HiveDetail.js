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
import NavBar from "./NavBar";
import IconThermometer from 'react-native-vector-icons/FontAwesome';
import IconWeight from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWater from 'react-native-vector-icons/Entypo';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export default class HiveDetail extends Component {

    static navigationOptions = {
        tabBarLabel: "Szczegóły"
    }

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(newProps) {
        //console.log("HiveDetail - componentWillReceiveProps")
    }

    componentDidUpdate(prevProps, prevState){
        //console.log("HiveDetail - componentDidUpdate")
    }

    render() {
        const {navigation: {state: {params: {hive}}}} = this.props
        console.log("HiveDetail")
        console.log(hive)
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{flex: 0.4, flexDirection: 'row'}}>
                            <View style={{flex: 1, elevation: 10, margin: 10, backgroundColor: 'white', borderRadius: 3}}>
                            <Image
                                resizeMode="cover"
                                style={[styles.hiveContainer]}
                                //source={{uri: 'http://imgs.steps.dragoart.com/how-to-draw-a-pony-step-7_1_000000053055_5.jpg'}}/>
                                source={{uri: 'http://www.protecttheplanet.co.uk/user/products/large/beehive-wooden-composter.jpg'}}/>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                                <Text style={{flex: 1, fontFamily: 'Raleway-Medium', fontSize: 20}}>Starogard Gdański</Text>
                                <Text style={{flex: 1, fontFamily: 'Raleway-SemiBold', fontSize: 25, color: '#d35400' }}>{hive.hive.name}</Text>
                            </View>
                        </View>
                        <View style={{flex: 0.6}}>
                            <View style={styles.statisticsContainer}>
                                <View style={styles.statisticsItem}>
                                    <IconThermometer size={20} name="thermometer" color="#e74c3c"/>
                                    <Text style={styles.txtItem}>{hive.temperatureIn}</Text>
                                </View>
                                <View style={styles.statisticsItem}>
                                    <IconWeight size={20} name="weight" color="black"/>
                                    <Text style={styles.txtItem}>{hive.weight}</Text>
                                </View>
                                <View style={styles.statisticsItem}>
                                    <IconWater size={20} name="water" color="#3498db"/>
                                    <Text style={styles.txtItem}>{hive.humidityIn}</Text>
                                </View>
                            </View>
                            <ScrollView style={{marginTop: 20}}>
                                <HiveDetailContent/>
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
        flex:1,
        width:null,
        height: null,
        borderRadius:3
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
    statisticsContainer: {
        flex: 0,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    statisticsItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtItem: {
        marginLeft: 5,
        fontFamily: 'Raleway-SemiBold',
        fontSize: 15,
        fontWeight: '400'
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