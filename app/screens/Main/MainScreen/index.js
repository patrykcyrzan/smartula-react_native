import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet, View,
} from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Dashboard from '../Dashboard';
import Dashboard2 from '../Dashboard2';
import Dashboard3 from '../Dashboard3';
import HiveDetail from '../Dashboard/HiveDetail'
import HiveDetailChart from '../Dashboard/HiveDetailChart'
import {StackNavigator, TabNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconChartSettings from 'react-native-vector-icons/SimpleLineIcons'
import PropTypes from 'prop-types'


const DashboardStackNavigator = StackNavigator({
    Dashboard: {
        screen: Dashboard,
    },
    HiveDetail: {
        screen: HiveDetail,
    },
},{ headerMode: 'none' })


const MainNavigator = TabNavigator(    {
    MoviesAndTV: { screen: DashboardStackNavigator},
    Music: { screen: Dashboard2 },
    Newsstand: { screen: Dashboard3 }
}, {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: '#FFE066',
            tabs: {
                MoviesAndTV: {
                    backgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <Icon size={24} color="#FFE066" name="dashboard" />
                },
                Music: {
                    barBackgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <IconChartSettings size={24} color="#FFE066" name="chart" />
                },
                Newsstand: {
                    barBackgroundColor: '#FAFAFA',
                    labelColor: '#CDD5DF',
                    activeLabelColor: '#FFE066',
                    activeIcon: <IconChartSettings size={24} color="#FFE066" name="settings" />
                }
            }
        }
    }
});

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        render() {
            const {screenProps, navigationOptions} = this.props;
            alert(JSON.stringify(screenProps.rootNavigation, null, 4));
            return <SomeComponent {...this.props} />
        }
    }
}

export default class MainScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {screenProps, navigationOptions} = this.props;
        //alert(JSON.stringify(screenProps.rootNavigation, null, 4));
        /*alert(JSON.stringify(this.props.screenProps, null ,4));
        this.props.screenProps.setParams({
            rootNavigation: screenProps.rootNavigation
        })*/
    }

    render() {
        const {screenProps, navigationOptions} = this.props;
        /*this.props.screenProps.setParams({
            rootNavigation: this.props.screenProps.rootNavigation,
        });*/
        //const { navigation } = this.props
        //alert(JSON.stringify(screenProps.rootNavigation, null, 4));
        //screenProps.rootNavigation.navigate("DrawerOpen");

        return (
            <View style={{ flex: 1 }}>
                <MainNavigator screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
            </View>
        )
    }
}
/*

MainScreen.propTypes = {
    rootNavigation: PropTypes.object.isRequired
}*/
