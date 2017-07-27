import React, {Component} from 'react';
import {
    StyleSheet, Text, View,
    AsyncStorage, ActivityIndicator, ListView,
    RefreshControl, StatusBar, TouchableOpacity, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as hives from '../../../data/hives/api';
import * as latestMeasurements from '../../../data/accesspoints/api';
import moment from 'moment-timezone'
import ScalableText from 'react-native-text'
import SingleAccessPoint from './SingleAccessPoint'

import ErrorPage from '../../../components/ErrorPage'

export default class Dashboard extends Component {
    static navigationOptions = {
        tabBarLabel: "Dashboard",
        tabBarIcon: () => <Icon size={24} name="dashboard" color="white"/>
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            error: false,
            accesspoints: [],
            refreshing: false
        }
    }

    getAllLatestMeasurements() {
        latestMeasurements.getAllLatestMeasurements()
            .then((latestMeasurements) => {
                alert(JSON.stringify(latestMeasurements, null, 4));
                const dashboard = {
                    accesspointsTable: latestMeasurements,
                    expireTime: moment().add(1, 'd').unix()
                }
                AsyncStorage.setItem('accesspoints', JSON.stringify(dashboard))
                    .then(() => {
                        this.setState({
                            isLoading: false,
                            refreshing: false,
                            error: false,
                            accesspoints: dashboard.accesspointsTable
                            //hives: dashboard.hiveTable
                        })
                    })
                    .catch(() => {
                        this.setState({
                            isLoading: false,
                            refreshing: false,
                            error: true
                        })
                    })
            })
    }

    componentWillMount() {
        AsyncStorage.getItem('accesspoints')
            .then((value) => {
                if (!value) {
                    this.getAllLatestMeasurements();

                    return
                }

                const dashboard = JSON.parse(value)

                if ( moment().unix() > dashboard.expireTime ) {
                    this.getAllLatestMeasurements()
                } else {
                    this.setState({
                        isLoading: false,
                        accesspoints: dashboard.accesspointsTable
                    })
                }
            })
            .catch(() => {
                this.getAllLatestMeasurements()
            })
    }

    render() {
        const { isLoading, accesspoints, error } = this.state;

        const DashboardContent = () => {
            if (isLoading) {
                return (
                    <ActivityIndicator
                        animating={ isLoading }
                        style={[ styles.centering, {height: 80} ]}
                        size="large" />
                )
            } else if (!isLoading && accesspoints.length === 0 && error) {
                return ( <ErrorPage /> )
            } else {
                return (
                    <View style={ styles.container }>
                        { accesspoints && accesspoints._cachedRowCount > 0 && error ?
                            <View style={ styles.errMsg }><ScalableText style={ styles.errMsgTxt }>Unable to load new data!</ScalableText></View> :
                            <View></View>
                        }
                            {/*<SingleAccessPoint
                                hives={accesspoints[0].latestMeasurementCollection}/>*/}
                        <FlatList
                            data={accesspoints}
                            SeparatorComponent={() => <View  style={{width: 5}}/>}
                            renderItem={({item}) => this._renderItem(item)}
                            keyExtractor={item => item.accesspointId}
                            refreshControl={this._refreshControl()}
                        />
                    </View>
                )
            }
        };

        return (
            <View style={ styles.container }>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'#202930'} />
                <DashboardContent />
            </View>
        )
    }

    _renderItem(item){

        alert(JSON.stringify(item.latestMeasurementCollection, null, 4));
        return (
            <SingleAccessPoint
                hives={item.latestMeasurementCollection}/>
        )
    }

    _refreshControl() {
        return (
            <RefreshControl
                refreshing={ this.state.refreshing }
                onRefresh={ () => this.refreshListView() } />
        )
    }

    refreshListView() {
        //Start Rendering Spinner
        this.setState({ refreshing: true })
        this.getAllLatestMeasurements()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        width: 150,
    },
    hives: {
        flex: 1
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    errMsg: {
        flexDirection: 'row',
        backgroundColor: '#f94057',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16
    },
    errMsgTxt: {
        fontSize: 10,
        color: '#fff'
    },
    raceName: {
        fontSize: 16,
        lineHeight: 20,
        color: '#444'
    },
    raceContent: {
        flex: 1,
        justifyContent: 'center'
    },
});