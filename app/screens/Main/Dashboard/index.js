import React, {Component} from 'react';
import {
    StyleSheet, Text, View,
    AsyncStorage, ActivityIndicator, ListView,
    RefreshControl, StatusBar, TouchableOpacity, FlatList, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as hives from '../../../data/hives/api';
import * as latestMeasurements from '../../../data/accesspoints/api';
import moment from 'moment-timezone'
import ScalableText from 'react-native-text'
import SingleAccessPoint from './SingleAccessPoint'

import ErrorPage from '../../../components/ErrorPage'
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import PropTypes from 'prop-types'

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Dashboard extends Component {
    static navigationOptions = {
        tabBarLabel: "Dashboardasd",
        tabBarIcon: () => <Icon size={24} name="dashboard" color="#CDD5DF"/>
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            error: false,
            accesspoints: [],
            refreshing: false
        }


        this.props.screenProps.actions.updateTabNav(this.props.navigation);
        console.log("PROPS")
        console.log(this.props)
        console.log("--------")
    }

    getAllLatestMeasurements() {
        latestMeasurements.getAllLatestMeasurements()
            .then((latestMeasurements) => {
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

    componentWillReceiveProps(newProps) {
        //console.log("Dash1 - componentWillReceiveProps")
        if (newProps.screenProps.navigation.route_index === 0) {
            this.props.screenProps.actions.updateTabNav(this.props.navigation);
        }
    }

    render() {
        const { isLoading, accesspoints, error } = this.state;

        //this.props.screenProps.actions.updateScrollPos('nowy obiekt');
        //alert(JSON.stringify(this.props.screenProps, null, 4));
        //console.log(this.props)
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
                        <ParallaxScrollView
                            backgroundSource={{uri:'http://i.imgur.com/6Iej2c3.png'}}
                            navBarTitle='John Oliver'
                            userName='John Oliver'
                            userTitle='Comedian'
                            userImage='http://i.imgur.com/RQ1iLOs.jpg'
                            leftIcon={{name: 'rocket', color: 'rgba(193, 193, 193, 1)', size: 30, type: 'font-awesome'}}
                            rightIcon={{name: 'user', color: 'rgba(193, 193, 193, 1)', size: 30, type: 'font-awesome'}}
                            refreshControl={this._refreshControl()}
                            navigation={ this.props.screenProps.rootNavigation }
                            action={this.props.screenProps.actions}
                        >
                            <FlatList
                                data={accesspoints}
                                SeparatorComponent={() => <View  style={{width: 30}}/>}
                                renderItem={({item}) => this._renderItem(item)}
                                keyExtractor={item => item.accesspointId}
                            />
                        </ParallaxScrollView>
                    </View>
                )
            }
        };

        return (
            <View style={ styles.container }>
                <DashboardContent />
                <View style={styles.bordered}/>
            </View>
        )
    }

    _renderItem(item){

        return (
            <SingleAccessPoint
                accesspoint={item.accesspointLocation}
                hives={item.latestMeasurementCollection}
                navigation={this.props.navigation}/>
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

Dashboard.propTypes = {
    screenProps: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
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
    bordered: {
        flex: 0,
        borderBottomWidth: 1,
        borderColor: '#EBECED'
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